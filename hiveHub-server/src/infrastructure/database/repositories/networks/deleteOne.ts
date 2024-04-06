import Networks from "../../models/networkModel"

export const deleteOne = (id: any) => {

    try {

        const status = Networks.deleteOne({ _id: id })

        return status

    } catch (error: any) {
        throw new Error(error)
    }
}