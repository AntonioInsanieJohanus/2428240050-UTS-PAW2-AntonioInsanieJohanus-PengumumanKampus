import z from "zod";

export const storepengumumanschema = z.object({
    title: z.string().trim().min(1, 'title tidak boleh kosong'),
    content: z.string().trim().min(1, 'content tidak boleh 0'),
    published_date: z.date().min(0, "tanggal terbit tidak boleh kosong")
})

export const updatepengumumanschema = z.object({
    title: z.string().trim().min(1, 'title tidak boleh kosong'),
    content: z.string().trim().min(1, 'content tidak boleh 0'),
    published_date: z.date().min(0, "tanggal terbit tidak boleh kosong")
})