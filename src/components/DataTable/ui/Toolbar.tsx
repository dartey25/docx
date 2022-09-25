import {useNavigate} from "react-router-dom";
import * as React from "react";
import {GridToolbarContainer} from "@mui/x-data-grid";
import Button from "../../ui/Button";
import TableQuickSort from "../ui/TableQuickSort";
import DensitySelector from "../ui/DensitySelector";
import Modal from "../../ui/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Toolbar() {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalOpen2, setModalOpen2] = React.useState(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <GridToolbarContainer className="mb-3">
                <div>
                    <Button onClick={() => setModalOpen(true)} icon="icon-upload4">
                        Завантажити
                    </Button>
                    <Button className="ml-4" type="light" onClick={() => ({})} icon="icon-download4">
                        Скачати
                    </Button>
                    <Button className="ml-2" type="light" onClick={() => navigate('123')}
                            icon="icon-comment-discussion">
                        Питання до підтримки
                    </Button>
                    <Button className="ml-2" type="light" onClick={() => setModalOpen2(true)} icon="icon-eye">
                        Превью
                    </Button>
                    {/*<IconButton type='danger' icon='icon-trash' title='Видалити'/>*/}
                </div>
                <div className='d-flex ml-auto align-items-center'>
                    <TableQuickSort/>
                    <DensitySelector/>
                </div>
            </GridToolbarContainer>
            <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Перетягніть файл
                    </Typography>
                    <Typography id="transition-modal-description" sx={{mt: 2}}>
                        Тут я завантажу ваш файл
                    </Typography>
                </Box>
            </Modal>
            <Modal open={modalOpen2} handleClose={() => setModalOpen2(false)}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Превью файлу
                    </Typography>
                    <Typography id="transition-modal-description" sx={{mt: 2}}>
                        Ваш imfx файл
                    </Typography>
                </Box>
            </Modal>
        </>
    )
        ;
}