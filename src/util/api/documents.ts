import axios from "../../core/axios";

export default {
    getAllByDialogId: (id: number) => axios.get(`xdoc.main.get_messages?p_code=${id}`)
};