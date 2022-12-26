const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router()
const Student = require('../models/studentModel')
const Class = require('../models/classModels')
router.use(bodyParser.json())


/*----------------- List of all classes ------------------*/
router.get('GET/v1/myClass', async (req, res) => {
    try {
        const classdata = await Class.find()
        res.status(200).json({
            status: "Success",
            classdata
        })
    } catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }

})

/*------------------CREATE NEW CLASSES--------------------*/
router.post('/POST/v1/myClass', async (req, res) => {
    try {
        const count = await Class.find()
        const studentdata = await Class.create({
            //name:req.body.name,
            // myClassId: count[0].length + 1,
            //studentId:req.body.studentId,
            class: req.body.class,
            studentCount: req.body.studentCount
        })
        res.status(201).json({
            status: "Success",
            studentdata
        })
    } catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }
})

/**---------------------------REGISTER NEW STUDENT------------------------ */

router.post('/POST/v1/myClass/:myClassId/students', async (req, res) => {
    try {
        const studentdata = await Student.create({_id: req.params.myClassId}, ...(req.body))
            // name: req.body.name,
            // studentId: req.body.studentId,
            //    class:req.body.class,
            //    studentCount:req.body.studentCount
        // })
        res.json({
            status: "Success",
            studentdata
        })
    } catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }
})

/**------------------------------GET CLASS BY ID--------------------- */
router.get('/GET/v1/myClass/:myClassId', async (req, res) => {
    try {
        const getbyId = await Class.find({ _id: req.params.myClassId })
        if (getbyId.length) {
            res.status(200).json({
                status: "Success",
                result: getbyId

            })
        } else {
            res.status(400).json({
                status: "Failed",
                result: "There is no class at that id"
            })
        }
    }
    catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }

})

/*---------------------------------DELETE CLASS ---------------------------------*/
router.delete("/Delete/v1/myClass/:myClassId", async (req, res) => {
    try {
        const deleted = await Class.find({ classId: req.params.myClassId })
        if (deleted.length) {
            await Class.deleteOne({ classId: req.params.myClassId })
            res.json({
                status: "Success",
                result: "data deleted successfully"
            })
        } else {
            res.json({
                status: "Failed",
                result: "Invalid Data"
            })
        }
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }

})

/*--------------------------DELETE STUDENT IN CLASS---------------------------*/

router.delete("/Delete/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const std = await Student.find({ id: req.params.id })
        if (std.length) {
            await Student.deleteOne({ id: req.params.id })
            res.json({
                status: "Success",
                result: "data deleted successfully"
            })
        } else {
            res.json({
                status: "Failed",
                result: "There is no task at that id"
            })
        }
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }

})

/**-----------GET ALL STUDENTS IN SPECIFIC CLASS------------------------*/
router.get('GET /v1/myClass/:myClassId/students', async (req, res) => {
    try {
        const getbyId = await Student.find({ _id: req.params.myClassId })
        if (getbyId.length) {
            res.status(200).json({
                status: "Success",
                result: getbyId

            })
        } else {
            res.status(400).json({
                status: "Failed",
                result: "There is no class at that id"
            })
        }
    }
    catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }

})

/**-----------------GET ALL STUDENTS IN SPECIFIC CLASS---------------- */

router.get('GET /v1/myClass/:myClassId/students', async (req, res) => {
    try {
        const getbyId = await Student.find({ _id: req.params.myClassId }, req.params.students)
        if (getbyId.length) {
            res.status(200).json({
                status: "Success",
                result: getbyId

            })
        } else {
            res.status(400).json({
                status: "Failed",
                result: "There is no student of that id"
            })
        }
    }
    catch (e) {
        res.json({
            status: "error",
            message: e.message
        })
    }

})

router.put("Put/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const std = await Student.find({ id: req.params.id })
        if (std.length) {
            await Student.updateOne({ id: req.params.id }, {})
            const updatedData = await Student.find({ id: req.params.id })
            res.json({
                status: "Data updated successfully",
                student: updatedData
            })
        } else {
            res.json({
                status: "failed",
                result: "Invalid data"
            })
        }

    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }

})


module.exports = router