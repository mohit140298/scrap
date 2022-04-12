const { puppeteerFunction } = require('../scripts/review')
exports.fetchReviews = async (req, res) => {
    try {
        const { link } = req.body
        if (!link) {
            return res.status(400).json({ status: "failed", message: "please provide the link" })
        }
        const data = await puppeteerFunction(link)
        if (!data) {
            return res.status(500).json({ status: "failed", message: "Reviews cannot be fetched" })
        }
        else if (data.length == 0) {
            return res.status(201).json({ status: "success", message: "No Reviews Found" })
        }
        else {
            return res.status(201).json({ status: "success", message: "reviews fetched", data: data })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error.message })
    }

}