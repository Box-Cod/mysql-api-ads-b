import express, {Request, Response} from "express";
import mysql from "mysql2/promise";
import { log } from "node:console";

const app = express();

// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.get('/users', async function (req: Request, res: Response) {
    const [rows] = await connection.query("SELECT * FROM users");
    return res.render('./users', {
        users: rows
    });
});

app.get('/users/form', async function (req: Request, res: Response) {
    return res.render("./users/form");
});

app.post('/users/add', async function (req: Request, res: Response) {
    const body = req.body;
    const [row] = await connection.query("SELECT email FROM users WHERE email = ? ", [body.email]);
    
    if (row[0] != undefined) {
        res.redirect("/users/form");
        return;
    }

    const insertQuery = "INSERT INTO users (name, email, password, role, registration_dt, active) VALUES (?, ?, ?, ?, ?, ?)";
    const regx = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,3}/);
    let date: String = new Date().toLocaleString();
    date = date.split(",")[0].split("/").reverse().join("-") + date.replaceAll("/", "-").split(",")[1];

    if (body.name == "") {
        res.redirect("/users/form");
        return;
    }

    if (!regx.test(body.email)) {
        res.redirect("/users/form");
        return;
    }

    if (body.password !== body.passwordConfirmation) {
        res.redirect("/users/form");
        return;
    }
    
    if (body.active == undefined || body.active == null) {
        body.active = "0";
    }
        
    await connection.query(insertQuery, [body.name, body.email, body.password, body.role, date, body.active]);
    res.redirect("/users");
    
});

app.post("/users/delete/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM users WHERE id = ?";
    await connection.query(sqlDelete, [id]);

    res.redirect("/users");
});

app.get("/", async function (req: Request, res: Response) {
    return res.render("./home");
});

app.get("/login", async function (req: Request, res: Response) {
    return res.render("./login");
});

app.post('/login', async function (req: Request, res: Response) {
    const body = req.body;

    const [row] = await connection.query("SELECT email, password FROM users WHERE email = ? AND password = ?", [body.email, body.password]);

    if (row[0] == undefined) {
        res.redirect("/login");
        return;
    }

    res.redirect("/users");

});

app.get('/categories', async function (req: Request, res: Response) {
    const [rows] = await connection.query("SELECT * FROM categories");
    return res.render('categories/index', {
        categories: rows
    });
});

app.get("/categories/form", async function (req: Request, res: Response) {
    return res.render("categories/form");
});

app.post("/categories/save", async function(req: Request, res: Response) {
    const body = req.body;
    const insertQuery = "INSERT INTO categories (name, created_at, updated_at) VALUES (?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())";
    await connection.query(insertQuery, [body.name]);

    res.redirect("/categories");
});

app.post("/categories/delete/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM categories WHERE id = ?";
    await connection.query(sqlDelete, [id]);

    res.redirect("/categories");
});

app.listen('3000', () => console.log("Server is listening on port 3000"));