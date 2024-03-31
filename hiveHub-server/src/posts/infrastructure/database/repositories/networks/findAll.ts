import Networks from "../../models/networkModel"

export const findAllNetworks = async (userId: any) => {

    try {


        const allDocuments = await Networks.find({})

        return allDocuments

    } catch (error: any) {
        console.log(error);

        throw new Error(error)
    }
}