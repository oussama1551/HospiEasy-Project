const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SQL Server configuration object
const config = {
    user: 'Oussama',
    password: 'foo',
    server: 'DESKTOP-S99JF2J',
    database: 'DevHospiEasy',
    options:{
      trustServerCertificate: true,
      trustedConnection: false,
      enableArithAbort: true,
      encrypt: true,
      instancename:'SQLEXPRESS'
  },
  port: 1433
  };

const pool = new sql.ConnectionPool(config);

app.get('/doctors', async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query('SELECT * FROM DoctorsInformations');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving doctors');
  } finally {
    pool.close();
  }
});
app.post('/doctors', async (req, res) => {
    const { DoctorID, Firstname, Lastname, Age, Gender } = req.body;
    try {
      await pool.connect();
      await pool
        .request()
        .input('DoctorID', sql.Int, DoctorID)
        .input('Firstname', sql.NVarChar(50), Firstname)
        .input('Lastname', sql.NVarChar(50), Lastname)
        .input('Age', sql.Int, Age)
        .input('Gender', sql.NVarChar(10), Gender)
        .query(
          'INSERT INTO DoctorsInformations (DoctorID, Firstname, Lastname, Age, Gender) VALUES (@DoctorID, @Firstname, @Lastname, @Age, @Gender)'
        );
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding doctor');
    } finally {
      pool.close();
    }
  });


  app.put('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { Firstname, Lastname, Age, Gender } = req.body;
  
    const pool = new sql.ConnectionPool(config);
  
    pool.connect(err => {
      if (err) {
        console.log(err);
        return;
      }
  
      const request = new sql.Request(pool);
  
      request.input('DoctorID', sql.Int, id);
      request.input('Firstname', sql.NVarChar(50), Firstname);
      request.input('Lastname', sql.NVarChar(50), Lastname);
      request.input('Age', sql.Int, Age);
      request.input('Gender', sql.NVarChar(10), Gender);
  
      request.query(
        'UPDATE DoctorsInformations SET Firstname = @Firstname, Lastname = @Lastname, Age = @Age, Gender = @Gender WHERE DoctorID = @DoctorID',
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
  
          res.send({
            DoctorID: id,
            Firstname,
            Lastname,
            Age,
            Gender,
          });
        }
      );
    });
  });
  
app.delete('/api/doctors/:id', (req, res) => {
  const { id } = req.params;

  const pool = new sql.ConnectionPool(config);

  pool.connect(err => {
    if (err) {
      console.log(err);
      return;
    }

    const request = new sql.Request(pool);

    request.input('DoctorID', sql.Int, id);

    request.query('DELETE FROM DoctorsInformations WHERE DoctorID = @DoctorID', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      res.sendStatus(204);
    });
  });
});

app.post('/addPatient', async (req, res) => {
  const { NomPatient, AgePatient, AdressePatient, StatutPatient} = req.body;
  try {
    await pool.connect();
    await pool
      .request()
      .input('NomPatient', sql.NVarChar(50), NomPatient)
      .input('AgePatient', sql.NVarChar(50), AgePatient)
      .input('AdressePatient', sql.NVarChar(50), AdressePatient)
      .input('StatutPatient', sql.NVarChar(50), StatutPatient)
      .query(
        'INSERT INTO PatientsTable (NomPatient, AgePatient, AdressePatient, StatutPatient) VALUES (@NomPatient, @AgePatient, @AdressePatient, @StatutPaient)'
      );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding Patient');
  } finally {
    pool.close();
  }
});

/*--------------------------------------------------------------------------*/

async function authenticateUser(userclinique, password) {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT * FROM UsersClinic
      WHERE userclinique = ${userclinique} AND password = ${password}
    `;
    return result.recordset[0];
  } catch (error) {
    console.error(error);
  } finally {
    sql.close();
  }
};
app.post('/api/login', async (req, res) => {
  const { userclinique, password } = req.body;
  const user = await authenticateUser(userclinique, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (user) {
    res.status(200).send({ userclinique: user.userclinique });
  }
  
});
//res.status(200).send({ message: 'Login successful' });
/*app.post('/api/login', (req, res) => {
  const { userclinic, password } = req.body;
  const sql = `SELECT userclinique FROM UsersClinic WHERE userclinique=${userclinic} AND password=${password}`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const user = result[0].userclinic;
      res.status(200).send({ user });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});*/


app.listen(4000, () => {
  console.log('Server started on port 4000');
});