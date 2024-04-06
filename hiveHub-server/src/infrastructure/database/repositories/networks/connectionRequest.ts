import { NetworksEntity } from "../../../../domain/entities";
import Connections from "../../models/networkModel";

export const connectionRequest = async (data: NetworksEntity): Promise<NetworksEntity | null> => {

    try {

        const connection = (await Connections.create(data)).populate('targetUserId')

        return connection

    } catch (error: any) {
        throw new Error(error.message)
    }

}