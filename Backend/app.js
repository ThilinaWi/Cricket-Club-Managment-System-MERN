const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error");
const authRouter = require("./router/authRouter");
const UserRouter = require("./router/userRoute");
const PracticeSessionTypeRouter = require("./router/practiceSessionTypeRoute");
const PracticeSessionRouter = require("./router/practiceSessionRoute");
const coachRouter = require("./router/coaches.js");

const PerformanceRouter = require("./router/PerformanceRoutes");

const eventTypeRoute = require('./router/eventsTypeRoutes');
const eventRoute = require('./router/eventsRoutes');

const ItemRoute = require('./router/ItemRoute');
const GetItemRoute = require('./router/GetItemRoute');

const employeeRoute = require("./router/PlayerSalaryRoute");
const coachRoute = require("./router/CoachSalaryRoute");

const CoordinatorRoute = require("./router/CoordinatorRoutes.js");

//database connection

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

  //MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors()); 

//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRouter);
app.use('/api', UserRouter);
app.use('/api', PracticeSessionRouter);
app.use('/api', PracticeSessionTypeRouter);
app.use('/api', eventTypeRoute);
app.use('/api', eventRoute);  

app.use('/api', PerformanceRouter);//Jayaisuru

app.use('/api', ItemRoute);
app.use('/api', GetItemRoute);



app.use('/coach',coachRouter)


app.use('/api', PerformanceRouter);//Jayaisuru
app.use("/api", employeeRoute);
app.use("/api", coachRoute);

app.use("/api", CoordinatorRoute);
//errorMiddleware
app.use(errorHandler); 

//pdf genarate Jayaisuru
const PDFDocument = require('pdfkit');
const Performance= require('../Backend/models/PerformanceModel');

//Jayaisuru
app.get('/generate-pdf', async (req, res) => {
  try {
      const performances = await Performance.find().sort({ updatedAt: -1 }).limit(10);

      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          res.writeHead(200, {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename=performance_report.pdf',
          });
          res.end(pdfData);
      });

      doc.fontSize(18).text('Player Performance Report', { align: 'center' });
      doc.moveDown(2);

      // Plot Runs Graph and Table
      plotGraphAndTable(doc, performances, {
          startX: 50,
          startY: 100,
          width: 450,
          height: 150,
          color: 'blue',
          label: 'Runs'
      });

      doc.addPage(); // Optionally start wickets on a new page

      
      plotGraphAndTable(doc, performances, {
          startX: 50,
          startY: 100,
          width: 450,
          height: 150,
          color: 'green',
          label: 'Wickets'
      });

      doc.end();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error generating PDF');
  }
});
function plotGraphAndTable(doc, data, { startX, startY, width, height, color, label }) {
  // Draw Graph
  const values = data.map(p => p[label]);
  const labels = data.map(p => `${p.Inits ? p.Inits + ' ' : ''}${p.LastName}`);
  const maxVal = Math.max(...values);
  const scale = height / maxVal;
  const barWidth = width / values.length;
  if(label=='Runs'){
    doc.fontSize(16).text(`Batting Performance`, startX, startY);
  }else{
    doc.fontSize(16).text(`Bowling Performance`, startX, startY);
  }
  startY += 20; // Move down for the graph

  values.forEach((val, i) => {
      const barHeight = val * scale;
      doc.fillColor(color)
         .rect(startX + i * barWidth, startY + height - barHeight, barWidth - 1, barHeight)
         .fill()
         .fontSize(10)
         .fillColor('black')
         .text(labels[i], startX + i * barWidth, startY + height+5, { width: barWidth, align: 'center', ellipsis: true });
  });

  // Draw Table below the graph
  startY += height + 30; // Move down for the table

  startY += 20; // Move down for table headers


     if(label=='Runs'){
      doc.fontSize(14).text('Player', startX, startY)
      .text('Matches', startX + 100, startY)
      .text('Innings', startX + 180, startY)
      .text('Runs', startX + 260, startY)
      .text('Average', startX + 340, startY)
      .text('Strike Rate', startX + 420, startY)
      data.forEach((p, i) => {
        startY += 30; // New line for each player
        doc.fontSize(12).text(`${p.Inits ? p.Inits + ' ' : ''}${p.LastName}`, startX, startY)
           .text(p.Matches, startX + 100, startY)
           .text(p.Inns, startX + 180, startY)
           .text(p[label], startX + 260, startY)
           .text(p.Ave, startX + 340, startY)
           .text(p.SR, startX + 420, startY);
    });
     }else{


      doc.fontSize(14).text('Player', startX, startY)
      .text('Matches', startX + 100, startY)
      .text('Inns', startX + 200, startY)
      .text('wicket', startX + 300, startY)
      .text('RunsInB', startX + 400, startY)
      .text('BAvg', startX + 500, startY)
      .text('Econ', startX + 600, startY);
      data.forEach((p, i) => {
        startY += 30; // New line for each player
        doc.fontSize(12).text(`${p.Inits ? p.Inits + ' ' : ''}${p.LastName}`, startX, startY)
           .text(p.Matches, startX + 100, startY)
           .text(p.Inns, startX + 200, startY)
           .text(p[label], startX + 300, startY)
           .text(p.RunsInB, startX + 400, startY)
           .text(p.BAvg, startX + 500, startY)
           .text(p.Econ, startX + 600, startY);

     });
  
}
}
  //port
const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


