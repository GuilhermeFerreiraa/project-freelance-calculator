// comandos em Bando de Dados são em LETRAS MAIÚSCULAS
// name: "mayk" name = identificador da info _ campo / "mayk" informação do campo
const Database = require('./config')

// toda vez que utilizarmos o AWAIT ele precisa estar em uma função ASYNC
// async envia ao js que dentro da estrutura do objeto tem um await 
const initDb = {
    async init() {



        // iniciando a conexão no banco de dados
        const db = await Database()

        // código em bd é passado através das crases
        //  AUTOINCREMENT é para adiocionar o número de id automaticamente
        await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`);
        // CAMPOS NO BD NÃO PODEM UTILIZAR "-" SOMENTE "_"
        await db.exec(`CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`)
        await db.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "guilherme",
    "https://github.com/guilherme1313.png",
    3000,
    5,
    5,
    4,
    75
);`)
        await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria do Gordo",
    0,
    1,
    1617514376018
);`)

        await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Projects",
    4,
    47,
    1617514376018
);`)

        // fechando o banco de dados
        await db.close()

    }
}

initDb.init()
