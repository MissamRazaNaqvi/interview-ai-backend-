import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// use for cross origin rule
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
// console.log(process.env.CORS_ORIGIN,"process.env.CORS_ORIGIN")

// use for form data 
app.use(express.json());
// use for url query data
app.use(express.urlencoded())
// use cookie crud operations 
app.use(cookieParser())

app.use(express.static('public'))


// routes

import { userRouter } from "./routes/user.route.js";
import { aiRouter } from "./routes/ai.route.js";

// routes declaration

app.use("/api/v1/users",userRouter)
app.use("/api/v1/interview",aiRouter)

// app.get('/',(req, res)=>{
//     res.send("Hellow your server running..........")
// })
// app.get('/user',(req,res)=>{
//     res.send("user data loading..........")
// })
// app.get('/api/patients',(req,res)=>{
//     res.send([
//         {
//           "id": "PAT001",
//           "patient": "Ethan Carter",
//           "disease": "Partial Paralysis",
//           "firstAppointment": "2025-11-09",
//           "nextAppointment": "2026-06-12",
//           "medicines": 3,
//           "status": "Active"
//         },
//         {
//           "id": "PAT002",
//           "patient": "Liam Carter",
//           "disease": "Statin Therapy",
//           "firstAppointment": "2025-11-07",
//           "nextAppointment": "2026-06-15",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT003",
//           "patient": "Noah Patel",
//           "disease": "Muscle Weakness",
//           "firstAppointment": "2025-11-04",
//           "nextAppointment": "2026-06-11",
//           "medicines": 1,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT004",
//           "patient": "Olivia Smith",
//           "disease": "Diabetes Type 2",
//           "firstAppointment": "2025-10-15",
//           "nextAppointment": "2026-06-18",
//           "medicines": 4,
//           "status": "Active"
//         },
//         {
//           "id": "PAT005",
//           "patient": "Sophia Johnson",
//           "disease": "Hypertension",
//           "firstAppointment": "2025-09-21",
//           "nextAppointment": "2026-06-20",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT006",
//           "patient": "James Brown",
//           "disease": "Arthritis",
//           "firstAppointment": "2025-08-11",
//           "nextAppointment": "2026-06-13",
//           "medicines": 3,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT007",
//           "patient": "Emma Wilson",
//           "disease": "Migraine",
//           "firstAppointment": "2025-12-01",
//           "nextAppointment": "2026-06-25",
//           "medicines": 1,
//           "status": "Active"
//         },
//         {
//           "id": "PAT008",
//           "patient": "Benjamin Thomas",
//           "disease": "Asthma",
//           "firstAppointment": "2025-11-18",
//           "nextAppointment": "2026-06-22",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT009",
//           "patient": "Charlotte Davis",
//           "disease": "Thyroid Disorder",
//           "firstAppointment": "2025-10-30",
//           "nextAppointment": "2026-06-19",
//           "medicines": 2,
//           "status": "Recovered"
//         },
//         {
//           "id": "PAT010",
//           "patient": "William Garcia",
//           "disease": "Kidney Stones",
//           "firstAppointment": "2025-09-08",
//           "nextAppointment": "2026-06-14",
//           "medicines": 3,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT011",
//           "patient": "Amelia Martinez",
//           "disease": "Back Pain",
//           "firstAppointment": "2025-11-11",
//           "nextAppointment": "2026-06-16",
//           "medicines": 1,
//           "status": "Active"
//         },
//         {
//           "id": "PAT012",
//           "patient": "Lucas Anderson",
//           "disease": "Anemia",
//           "firstAppointment": "2025-10-22",
//           "nextAppointment": "2026-06-24",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT013",
//           "patient": "Harper Taylor",
//           "disease": "Bronchitis",
//           "firstAppointment": "2025-09-27",
//           "nextAppointment": "2026-06-21",
//           "medicines": 3,
//           "status": "Recovered"
//         },
//         {
//           "id": "PAT014",
//           "patient": "Mason White",
//           "disease": "Gastric Ulcer",
//           "firstAppointment": "2025-08-19",
//           "nextAppointment": "2026-06-17",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT015",
//           "patient": "Evelyn Harris",
//           "disease": "Depression",
//           "firstAppointment": "2025-11-14",
//           "nextAppointment": "2026-06-28",
//           "medicines": 4,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT016",
//           "patient": "Alexander Clark",
//           "disease": "Insomnia",
//           "firstAppointment": "2025-10-10",
//           "nextAppointment": "2026-06-26",
//           "medicines": 1,
//           "status": "Active"
//         },
//         {
//           "id": "PAT017",
//           "patient": "Mia Lewis",
//           "disease": "Heart Disease",
//           "firstAppointment": "2025-07-12",
//           "nextAppointment": "2026-06-29",
//           "medicines": 5,
//           "status": "Active"
//         },
//         {
//           "id": "PAT018",
//           "patient": "Daniel Walker",
//           "disease": "High Cholesterol",
//           "firstAppointment": "2025-09-16",
//           "nextAppointment": "2026-06-27",
//           "medicines": 2,
//           "status": "Recovered"
//         },
//         {
//           "id": "PAT019",
//           "patient": "Ava Hall",
//           "disease": "Allergic Rhinitis",
//           "firstAppointment": "2025-11-20",
//           "nextAppointment": "2026-06-30",
//           "medicines": 1,
//           "status": "Active"
//         },
//         {
//           "id": "PAT020",
//           "patient": "Michael Allen",
//           "disease": "Epilepsy",
//           "firstAppointment": "2025-08-28",
//           "nextAppointment": "2026-07-02",
//           "medicines": 3,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT021",
//           "patient": "Isabella Young",
//           "disease": "Osteoporosis",
//           "firstAppointment": "2025-07-30",
//           "nextAppointment": "2026-07-05",
//           "medicines": 2,
//           "status": "Active"
//         },
//         {
//           "id": "PAT022",
//           "patient": "Henry King",
//           "disease": "Liver Infection",
//           "firstAppointment": "2025-10-05",
//           "nextAppointment": "2026-07-01",
//           "medicines": 4,
//           "status": "Active"
//         },
//         {
//           "id": "PAT023",
//           "patient": "Grace Scott",
//           "disease": "Pneumonia",
//           "firstAppointment": "2025-09-13",
//           "nextAppointment": "2026-07-03",
//           "medicines": 3,
//           "status": "Recovered"
//         },
//         {
//           "id": "PAT024",
//           "patient": "Sebastian Green",
//           "disease": "Cervical Pain",
//           "firstAppointment": "2025-11-02",
//           "nextAppointment": "2026-07-04",
//           "medicines": 2,
//           "status": "Follow Up"
//         },
//         {
//           "id": "PAT025",
//           "patient": "Ella Adams",
//           "disease": "Sciatica",
//           "firstAppointment": "2025-10-18",
//           "nextAppointment": "2026-07-06",
//           "medicines": 3,
//           "status": "Active"
//         }
//       ])
// })

export  {app}