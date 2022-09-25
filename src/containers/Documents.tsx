import React from "react";

import DataTable from '../components/DataTable/DataTable';
import {GridColDef, GridRenderCellParams, GridRowsProp} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import {alpha, Menu, MenuProps} from "@mui/material";
import Time from "../components/Time/Time";
import IconButton from "../components/ui/IconButton";
import {useNavigate} from "react-router-dom";
import {useDemoData} from "@mui/x-data-grid-generator";

const Documents: React.FC = () => {
    const navigate = useNavigate();
    const {loading} = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 40,
        editable: false,
    });

    const rows: GridRowsProp = [
        {
            id: 1,
            document: 'MDUA806020_001667.zmdx',
            type: 'Рідний',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1735',
            date: '2022-06-29'
        },
        {
            id: 2,
            document: 'MDUA100230_001046.zmdx',
            type: 'Рідний',
            comment: '',
            size: '1875',
            date: '2022-06-29'
        },
        {
            id: 3,
            document: 'CCD_1046.imfx',
            type: 'UA100230 МД Вн.№ 1046 (ЕК 10 АА) від 19.08.2022',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1564',
            date: '2022-08-15'
        },
        {
            id: 4,
            document: 'MDUA806020_001667.zmdx',
            type: 'Рідний',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1735',
            date: '2022-06-29'
        },
        {
            id: 5,
            document: 'MDUA100230_001046.zmdx',
            type: 'Рідний',
            comment: '',
            size: '1875',
            date: '2022-06-04'
        },
        {
            id: 6,
            document: 'CCD_1046.imfx',
            type: 'UA100230 МД Вн.№ 1046 (ЕК 10 АА) від 19.08.2022',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1564',
            date: '2022-08-15'
        },
        {
            id: 7,
            document: 'MDUA806020_001667.zmdx',
            type: 'Рідний',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1735',
            date: '2022-06-29'
        },
        {
            id: 8,
            document: 'MDUA100230_001046.zmdx',
            type: 'Рідний',
            comment: '',
            size: '1875',
            date: '2022-04-06'
        },
        {
            id: 9,
            document: 'CCD_1046.imfx',
            type: 'UA100230 МД Вн.№ 1046 (ЕК 10 АА) від 19.08.2022',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1564',
            date: '2022-08-15'
        },
        {
            id: 10,
            document: 'MDUA806020_001667.zmdx',
            type: 'Рідний',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1735',
            date: '2022-06-29'
        },
        {
            id: 11,
            document: 'MDUA100230_001046.zmdx',
            type: 'Рідний',
            comment: '',
            size: '1875',
            date: '2022-04-13'
        },
        {
            id: 12,
            document: 'CCD_1046.imfx',
            type: 'UA100230 МД Вн.№ 1046 (ЕК 10 АА) від 19.08.2022',
            comment: 'Графа 14 : № дозволу митного брокера не зайдений в базі даних миниці.',
            size: '1564',
            date: '2022-08-15'
        },

    ];




    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({theme}) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    const columns: GridColDef[] = [
        {
            field: 'comment', headerName: 'Комментар', flex: 2, renderCell: (params: GridRenderCellParams) => {
                return params.value ? <div className="MuiDataGrid-cellContent">{params.value}</div> :
                    <span className="text-muted">Відсутній</span>;
            }
        },
        {field: 'type', headerName: 'Формат', flex: 1},
        {field: 'document', headerName: 'Назва файлу', flex: 1},
        {
            field: 'date',
            headerName: 'Дата завантаження',
            width: 150,
            renderCell: (params: GridRenderCellParams) => <span className="text-muted">{<Time short date={params.value}/>}</span>
        },
        {
            field: "actions",
            align: "right",
            headerName: 'Дії',
            hideable: false,
            sortable: false,
            disableExport: true,
            width: 250,
            renderHeader: () => <></>,
            renderCell: (params: GridRenderCellParams) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
                // const open = Boolean(anchorEl);
                // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                //     setAnchorEl(event.currentTarget);
                // };
                // const handleClose = () => {
                //     setAnchorEl(null);
                // };

                return (
                    <div className='d-flex justify-content-end'>
                        <IconButton icon='icon-download4' title="Скачати" onClick={e => e.stopPropagation()}/>
                        <IconButton icon='icon-eye' title="Превью" onClick={e => e.stopPropagation()}/>
                        <IconButton icon='icon-printer4' title="Друкувати" onClick={e => e.stopPropagation()}/>
                        <IconButton icon='icon-comment-discussion' title="Переписка" onClick={(e) => {
                            e.stopPropagation();
                            navigate('123')
                        }}/>
                        <IconButton icon='icon-trash' type='secondary' title="Видалити" onClick={(e) => {
                            e.stopPropagation()
                        }}/>
                        {/*<IconButton icon={<DotsHorizontalIcon/>} onClick={(e) => {e.stopPropagation(); handleClick(e)}}/>*/}
                        {/*<StyledMenu*/}
                        {/*    id="demo-customized-menu"*/}
                        {/*    MenuListProps={{*/}
                        {/*        'aria-labelledby': 'demo-customized-button',*/}
                        {/*    }}*/}
                        {/*    anchorEl={anchorEl}*/}
                        {/*    open={open}*/}
                        {/*    onClose={handleClose}*/}
                        {/*>*/}
                        {/*    <MenuItem onClick={handleClose} disableRipple>*/}
                        {/*        <Icon classNames='text-secondary mr-2' type='icon-download4'/>*/}
                        {/*        Скачати файл*/}
                        {/*    </MenuItem>*/}
                        {/*    <MenuItem onClick={() => {handleClose(); navigate('123')}} disableRipple>*/}
                        {/*        <Icon classNames='text-secondary mr-2' type='icon-bubbles2'/>*/}
                        {/*        Переписка*/}
                        {/*    </MenuItem>*/}
                        {/*    <MenuItem onClick={handleClose} disableRipple>*/}
                        {/*        <Icon classNames='text-danger mr-2' type='icon-trash'/>*/}
                        {/*        <span className='text-danger'>Видалити</span>*/}
                        {/*    </MenuItem>*/}
                        {/*</StyledMenu>*/}
                    </div>
                )
            },
        },
    ];

    return (
        <div className="main__documents">
            <div className="main__documents-header">
                <div className="main__documents-header-partner">
                    <h5 className="font-weight-semibold m-0">Завантажені файли</h5>
                </div>
            </div>
            <div className="main__documents-content">
                <DataTable rows={rows} columns={columns} loading={loading}/>
            </div>
        </div>
    );
};

export default Documents;