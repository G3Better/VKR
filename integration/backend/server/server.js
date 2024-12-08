const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const host = "localhost";
const port = 5000;
const server = express();

server.use('/public', express.static('public'));
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:false}))

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "integration_v3",
    password: ""
  });


server.set("view engine", "hbs");

server.listen(port, host, ( error) => {
  error
    ? console.error("error = ", error)
    : console.log(`Server is running on http://${host}:${port}`);
});




// Авторизация
server.post('/api/signIn/:login', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const { login, password } = req.body;

    pool.query(`Select * from users INNER JOIN roles ON role = roles.id_role where users.login = '${login}' AND users.password = '${password}'`, (err, data) => {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        console.log(data);
        return res.json({ role:data[0]?.name, id:data[0]?.id_user, fio:data[0]?.FIO})
    })
})


// Регистрация
server.post('/api/signUp/:login', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const { fio, email, post, contacts, login, password } = req.body;

    pool.query(`INSERT INTO users (id_users, FIO, email, post, contacts, role, login, password) VALUES ('NULL','${fio}','${email}','${post}','${contacts}','1','${login}','${password}')`, (err, data) => {
        if (err) return console.error(err);
        return res.json("Успещно зарегистрирован");
    })
})

// Получение всех типов авторизации
server.get("/api/authorizations", function(req, res){
    pool.query("SELECT `id_authorization` as id, `name` as name FROM `authorizations`", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление типа авторизации
server.delete("/api/authorizations/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM authorizations WHERE id_authorization='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Authorization deleted');
    });
});

// Редактирование авторизации
server.put("/api/authorizations/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name } = req.body;
    pool.query(`UPDATE authorizations SET name='${name}' WHERE id_authorization='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Authorization updated');
    });
});

// Добавление авторизации
server.post("/api/authorizations/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name } = req.body;
    pool.query(`INSERT INTO authorizations(id_authorization, name) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Authorization added');
    });
});

// Получение всех контуров
server.get("/api/contours", function(req, res){
    pool.query("SELECT `id_contour` as id, `name` as name FROM `contours`", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление контура
server.delete("/api/contours/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM contours WHERE id_contour='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Сontour deleted');
    });
});

// Редактирование контура
server.put("/api/contours/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name } = req.body;
    pool.query(`UPDATE contours SET name='${name}' WHERE id_contour='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Сontour updated');
    });
});

// Добавление контура
server.post("/api/contours/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name } = req.body;
    pool.query(`INSERT INTO contours(id_contour, name) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Сontour added');
    });
});

// Получение всех ответсвенных
server.get("/api/responsible", function(req, res){
    pool.query("SELECT id_users as id, FIO as fio FROM users", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.fio }
        })
        res.json(newData);
    });
});

// Получение всех Систем-Источников
server.get("/api/systems", function(req, res){
    pool.query("SELECT `id_system` as id, `name` as name, FIO as responsible FROM `systems`, `users` WHERE responsible=users.id_users;", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name, responsible: elem.responsible }
        })
        res.json(newData);
    });
});

// Удаление Системы-Источника
server.delete("/api/systems/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM systems WHERE id_system='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('System deleted');
    });
});

// Редактирование системы источника
server.put("/api/systems/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name, responsible } = req.body;
    pool.query(`UPDATE systems SET name='${name}', responsible='${responsible}' WHERE id_system='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('System updated');
    });
});

// Добавление системы источника
server.post("/api/systems/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name, responsible } = req.body;
    pool.query(`INSERT INTO systems (id_system, name, responsible) VALUES ('NULL','${name}','${responsible}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('System added');
    });
});

// Получение всех Networks
server.get("/api/networks", function(req, res){
    pool.query("SELECT id_network as id, name as name FROM networks", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление Network
server.delete("/api/networks/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM networks WHERE id_network='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Network deleted');
    });
});

// Редактирование Network
server.put("/api/networks/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name, desc } = req.body;
    pool.query(`UPDATE networks SET name='${name}' WHERE id_network='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Network updated');
    });
});

// Добавление Network
server.post("/api/networks/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name, desc } = req.body;
    pool.query(`INSERT INTO networks(id_network, name) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Network added');
    });
});

// Получение всех RequestRates
server.get("/api/request_rates", function(req, res){
    pool.query("SELECT id_request_rate as id, rate as name FROM request_rates", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление RequestRates
server.delete("/api/request_rates/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM request_rates WHERE id_request_rate='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Request Rates deleted');
    });
});

// Редактирование RequestRates
server.put("/api/request_rates/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name } = req.body;
    pool.query(`UPDATE request_rates SET rate='${name}' WHERE id_request_rate='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Request Rates updated');
    });
});

// Добавление RequestRates
server.post("/api/request_rates/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name } = req.body;
    pool.query(`INSERT INTO networks(id_request_rate, rate) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Request Rates added');
    });
});

// Получение всех Roles
server.get("/api/roles", function(req, res){
    pool.query("SELECT id_role as id, name as name FROM roles", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление Role
server.delete("/api/roles/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM roles WHERE id_role='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Role deleted');
    });
});

// Редактирование Role
server.put("/api/roles/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name } = req.body;
    pool.query(`UPDATE roles SET name='${name}' WHERE id_role='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Role updated');
    });
});

// Добавление Role
server.post("/api/roles/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name } = req.body;
    pool.query(`INSERT INTO roles(id_role, name) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Roles added');
    });
});

// Получение всех Status
server.get("/api/status", function(req, res){
    pool.query("SELECT id_status as id, name as name FROM status", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление Status
server.delete("/api/status/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM status WHERE id_status='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Status deleted');
    });
});

// Редактирование Status
server.put("/api/status/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name } = req.body;
    pool.query(`UPDATE status SET name='${name}' WHERE id_status='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Status updated');
    });
});

// Добавление Status
server.post("/api/status/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name } = req.body;
    pool.query(`INSERT INTO status(id_status, name) VALUES ('Null','${name}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Status added');
    });
});

// Получение всех Endpoints
server.get("/api/endpoints", function(req, res){
    pool.query("SELECT id_endpoint as id, endpoints.name as name, ip as ip, port as port, network as network, contour as contour, it_system as system, description as 'desc' FROM endpoints, contours, systems, networks WHERE network=networks.id_network and contour=contours.id_contour and it_system=systems.id_system", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name, ip: elem.ip, port: elem.port, network: elem.network, contour: elem.contour, system: elem.system, desc: elem.desc}
        })
        res.json(newData);
    });
});

// Удаление Endpoints
server.delete("/api/endpoints/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM endpoints WHERE id_endpoint='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Endpoints deleted');
    });
});

// Редактирование Endpoints
server.put("/api/endpoints/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name, ip, port, network, contour, system, desc } = req.body;
    pool.query(`UPDATE endpoints SET name='${name}', ip='${ip}', port='${port}', network='${network}', contour='${contour}', it_system='${system}', description='${desc}' WHERE id_endpoint='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Endpoint updated');
    });
});

// Добавление Status
server.post("/api/endpoints/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name, ip, port, network, contour, system, desc } = req.body;
    pool.query(`INSERT INTO endpoints(id_endpoint, name, ip, port, network, contour, it_system, description) VALUES (NULL,'${name}','${ip}','${port}','${network}','${contour}','${system}','${desc}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Endpoints added');
    });
});




// Получение всех пользователей
server.get("/api/users", function(req, res){
    pool.query("SELECT FIO as fio, roles.name as role, users.id_users as id, users.email as email, users.post as post, users.contacts as contacts FROM users INNER JOIN roles ON role=roles.id_role", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, fio: elem.fio, role: elem.role, email: elem.email, post: elem.post, contacts: elem.contacts  }
        })
        res.json(newData);
    });
});

// Получение всех ролей
server.get("/api/roles", function(req, res){
    pool.query("SELECT * FROM `roles`", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id_role, name: elem.name}
        })
        res.json(newData);
    });
});

// Удаление пользователя
server.delete("/api/users/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`Delete From users where id_users = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('delete user');
    });
});

// Добавление пользователя
server.post('/api/users/add', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const { fio, email, post, contacts, login, password } = req.body;
    pool.query(`INSERT INTO users (id_users, FIO, email, post, contacts, role, login, password) VALUES ('NULL','${fio}','${email}','${post}','${contacts}','1','${login}','${password}')`, (err, data) => {
        if (err) return console.error(err);
        return res.json("пользователь добавлен");
    })
})

// Редактирование пользователя
server.put("/api/users/edit/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id, fio, email, post, idRole, contacts } = req.body;
    pool.query(`UPDATE users SET FIO ='${fio}', email ='${email}', post ='${post}', role ='${idRole}', contacts = '${contacts}' WHERE users.id_users = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('user updated');
    });
});

// Получение систем-источников для заказов
server.get("/api/src_systems_order", function(req, res){
    pool.query("SELECT id_it_system_src as id, name as name FROM it_system_src", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name }
        })
        res.json(newData);
    });
});

// Получение систем-получателей для заказов
server.get("/api/dst_systems_order", function(req, res){
    pool.query("SELECT id_it_system_dst as id, name as name FROM it_system_dst", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name }
        })
        res.json(newData);
    });
});

// Получение владельца для заявки
server.get("/api/users_order", function(req, res){
    pool.query("SELECT id_users as id, FIO as name FROM users", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name }
        })
        res.json(newData);
    });
});

// Получение частоты вызова для заказов
server.get("/api/requests_rate", function(req, res){
    pool.query("SELECT id_request_rate as id, rate as rate FROM request_rate", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.rate }
        })
        res.json(newData);
    });
});

// Получение статусов для заказов
server.get("/api/statuses", function(req, res){
    pool.query("SELECT id_status as id, name as name FROM status", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name }
        })
        res.json(newData);
    });
});

// Получение типов авторизации для заказов
server.get("/api/authorization", function(req, res){
    pool.query("SELECT id_authorization as id, name as name FROM authorization", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name }
        })
        res.json(newData);
    });
});

// Получение заявок
server.get("/api/orders", function(req, res){
    pool.query("SELECT id_order as id_order, it_system_src.name as source_system, it_system_dst.name as dest_system, users.FIO as customer, authorization.name as authorization, request_rate.rate as request_rate, status.name AS status, description, swagger FROM `orders`, it_system_src, it_system_dst, users, authorization, request_rate, status WHERE source_system=it_system_src.id_it_system_src AND dest_system=it_system_dst.id_it_system_dst AND customer=users.id_users AND authorization=authorization.id_authorization AND request_rate=request_rate.id_request_rate AND status=status.id_status", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id_order, source: elem.source_system, dest: elem.dest_system, customer: elem.customer, authorization: elem.authorization, request_rate: elem.request_rate, status: elem.status, description: elem.description, swagger: elem.swagger   }
        })
        res.json(newData);
    });
});

// Удаление заявки
server.delete("/api/orders/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query("DELETE FROM `orders` WHERE id_order='"+id+"'", function(err, data) {
        if (err) return console.error(err);
        res.json('Order deleted');
    });
});

// Редактирование заказов
server.put("/api/orders/edit/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id, source_system, dest_system, request_rate, status, authorization, customer, description, swagger } = req.body;
    console.log(req.body);
    pool.query("UPDATE `orders` SET source_system="+source_system+", dest_system="+dest_system+", customer="+customer+", authorization='"+authorization+"', request_rate='"+request_rate+"', status='"+status+"', description='"+description+"', swagger='"+swagger+"' WHERE id_order='"+id+"'", function(err, data) {
        if (err) return console.error(err);
        res.json('orders updated');
    });
});

// Добавление заказов
server.post("/api/orders/add", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { source_system, dest_system, request_rate, status, authorization, customer, description, swagger } = req.body;
    pool.query("INSERT INTO `order` (id_order, source_system, dest_system, customer, authorization, request_rate, status, description, swagger) VALUES ('Null','"+source_system+"','"+dest_system+"','"+customer+"','"+authorization+"','"+request_rate+"','"+status+"','"+description+"','"+swagger+"')", function(err, data) {
        if (err) return console.error(err);
        res.json('orders updated');
    });
});

// Получение всех Ip
server.get("/api/ips", function(req, res){
    pool.query("SELECT id_ip as id, ip as name, description FROM ip_address", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            return { id: elem.id, name: elem.name, desc: elem.description}
        })
        res.json(newData);
    });
});

// Удаление Ip
server.delete("/api/ips/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`DELETE FROM ip_address WHERE id_ip='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Ip deleted');
    });
});

// Редактирование Ip
server.put("/api/ips/edit/:id", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { id, name, desc } = req.body;
    pool.query(`UPDATE ip_address SET ip='${name}', description='${desc}' WHERE id_ip='${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('Ip updated');
    });
});

// Добавление Ip
server.post("/api/ips/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { name, desc } = req.body;
    pool.query(`INSERT INTO ip_address(id_ip, ip, description) VALUES ('Null','${name}','${desc}')`, function(err, data) {
        if (err) return console.error(err);
        res.json('Ip added');
    });
});