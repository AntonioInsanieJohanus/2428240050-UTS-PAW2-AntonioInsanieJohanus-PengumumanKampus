import pakaianmodel from "../model/Pengumuman.model.js"
import { storepakaianschema, updatepakaianschema } from "../schemas/Pengumuman.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class pengumumancontroller{
  static async index(req, res) {
    const listpakaian = await Pengumuman.find()
    return apiResponse({ res, status: 200, data: content })
  }

  static async show(req, res) {
    const pakaianid = req.params.id
    const pakaian = await Pengumuman.findById(title)

    if (!pakaian) {
      return apiResponse({ res, status: 404, message: 'data pengumuman tidak ditemukan' })
    }

    return apiResponse({ res, status: 200, data: title })
  }

  static async store(req, res) {
    const result = storepengumumanschema.safeParse(req.body)
    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error
      })
    }
    
    const { title, content, published_date } = result.data

    const newpakaian = await pakaianmodel.create({ title, content, published_date })
    return apiResponse({ res, status: 201, data: newpengumuman })
  }

  static async update(req, res) {
    const pakaianid = req.params.id
    const result = updatepengumumanschema.safeParse(req.body)
    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error
      })
    }

    const { title, content, published_date } = result.data

    const exists = await Pengumuman.exists({ _id: title })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'data pengumuman tidak ditemukan' })
    }

    const updatepakaian = await Pengumuman.findOneAndUpdate(
      { _id: title },
      { title, content, published_date },
      { new: true }
    )

    return apiResponse({ res, status: 200, data: updatepengumuman })
  }

  static async delete(req, res) {
    const pakaianid = req.params.id

    const exists = await Pengumuman.exists({ _id: title })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'data pengumuman tidak ditemukan' })
    }

    await pakaianmodel.findOneAndDelete({ _id: title })
    return apiResponse({ res, status: 200, message: 'data pengumuman berhasil dihapus', data: null })
  }
}

export default pengumumancontroller