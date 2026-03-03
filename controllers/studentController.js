import Student from "../models/student.js"

export function getStudent(req,res){
    
    if(req.user == null){
        res.json({
            message : "cannot find user please login and try again."
        })
        return
    }
    if(req.user.role != "admin"){
        res.json({
            message : "Only admins can view students."
        })
        return
    }

        Student.find().then((students)=>{
        res.json(students)
    })
}

export function createStudent(req,res){
     console.log(req.body)
     const student = new Student(req.body)
     student.save().then(
        ()=>{
            res.json({
                message : "Student created successfully"
            })
        }
     )
}

export function deleteStudent(req,res){
    console.log("delete request received")

    res.json({
        message : "Good Bye " + req.body.name
    })
}


export function updateStudent(req,res){
    console.log("put request received")

    res.json({
        message : "See you again " + req.body.name
    })
}