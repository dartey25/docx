import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    gridPageCountSelector,
    gridPageSelector, GridRenderCellParams, GridRowsProp,
    GridToolbarContainer,
    ukUA,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import {useDemoData} from '@mui/x-data-grid-generator';
import {styled} from '@mui/material/styles';
import Button from './ui/Button';
import Pagination from '@mui/material/Pagination';
import {alpha, Menu, MenuProps, PaginationItem} from "@mui/material";
import TableQuickSort from "./DataTable/ui/TableQuickSort";
import DensitySelector from "./DataTable/ui/DensitySelector";
import {useNavigate} from "react-router-dom";
import Modal from "./ui/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "./ui/IconButton";
import Empty from "./Empty";
import Loader from "./Loader/Loader";
import Time from "./Time/Time";

const AntDesignStyledDataGrid = styled(DataGrid)(({theme}) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
            borderRight: `1px solid ${
                theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${
                theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
        },
        '& .MuiDataGrid-cell': {
            color:
                theme.palette.mode === 'light'
                    ? 'rgba(0,0,0,.85)'
                    : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
            borderRadius: 0
        },
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${
                theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
            }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    },
}));

const StyledBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    '& .MuiFormGroup-options': {
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
        '& > div': {
            minWidth: 100,
            margin: theme.spacing(2),
            marginLeft: 0,
        },
    },
}));


type GridDataType = 'Employee' | 'Commodity';
type GridDataThemeOption = 'default' | 'ant';

interface GridPaginationSettings {
    pagination: boolean;
    autoPageSize: boolean;
    pageSize: number | undefined;
}

interface GridConfigOptions {
    size: number;
    type: GridDataType;
    pagesize: number;
    theme: GridDataThemeOption;
}

interface GridToolbarContainerProps {
    onApply: (options: GridConfigOptions) => void;
    size: number;
    type: GridDataType;
    theme: GridDataThemeOption;
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    // color: '#fff',
    //     border: '1px solid transparent',
    //     backgroundColor: '#37474f'

    return (
        <Pagination
            color="secondary"
            variant="text"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple/>}
            onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                apiRef.current.setPage(value - 1)
            }
        />
    );
}

function CustomToolbar() {
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
                    <Button className="ml-2" type="light" onClick={() => navigate('123')} icon="icon-comment-discussion">
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

export default function Documents() {
    const [isAntDesign, setIsAntDesign] = React.useState<boolean>(false);
    const [type, setType] = React.useState<GridDataType>('Commodity');
    const [size, setSize] = React.useState(100);
    const {loading, data, setRowLength, loadNewData} = useDemoData({
        dataSet: type,
        rowLength: size,
        maxColumns: 40,
        editable: false,
    });
    const navigate = useNavigate();

    const [pagination, setPagination] = React.useState<GridPaginationSettings>({
        pagination: false,
        autoPageSize: false,
        pageSize: undefined,
    });

    const getActiveTheme = () => {
        return isAntDesign ? 'ant' : 'default';
    };

    const handleApplyClick: GridToolbarContainerProps['onApply'] = (settings) => {
        if (size !== settings.size) {
            setSize(settings.size);
        }

        if (type !== settings.type) {
            setType(settings.type);
        }

        if (getActiveTheme() !== settings.theme) {
            setIsAntDesign(!isAntDesign);
        }

        if (size !== settings.size || type !== settings.type) {
            setRowLength(settings.size);
            loadNewData();
        }

        const newPaginationSettings: GridPaginationSettings = {
            pagination: settings.pagesize !== -1,
            autoPageSize: settings.pagesize === 0,
            pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
        };

        setPagination(
            (
                currentPaginationSettings: GridPaginationSettings,
            ): GridPaginationSettings => {
                if (
                    currentPaginationSettings.pagination ===
                    newPaginationSettings.pagination &&
                    currentPaginationSettings.autoPageSize ===
                    newPaginationSettings.autoPageSize &&
                    currentPaginationSettings.pageSize === newPaginationSettings.pageSize
                ) {
                    return currentPaginationSettings;
                }
                return newPaginationSettings;
            },
        );
    };

    // const DataGridComponent = isAntDesign ? AntDesignStyledDataGrid : DataGrid;

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

    const StyledGridOverlay = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .ant-empty-img-1': {
            fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
            fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
            fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
            fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
            fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
            fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
    }));

    function CustomNoRowsOverlay() {
        return (<Empty text="'Файли поки відсутні..'"/>);
    }
    function CustomLoadingOverlay() {
        return (<Loader/>);
    }

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

    function SortedDescendingIcon() {
        return <i className='icon-arrow-down12 mt-1'></i>;
    }

    function SortedAscendingIcon() {
        return  <i className='icon-arrow-up12'></i>;
    }



    return (
        <AntDesignStyledDataGrid
            rows={rows}
            columns={columns}
            //{...data}
            disableColumnMenu
            components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination,
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: CustomLoadingOverlay,
                ColumnSortedDescendingIcon: SortedDescendingIcon,
                ColumnSortedAscendingIcon: SortedAscendingIcon,
            }}
            componentsProps={{
                toolbar: {showQuickFilter: true},
            }}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
            rowThreshold={0}
            initialState={{
                ...data.initialState
            }}
            //{...pagination}
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
        />
        //</StyledBox>
    );
}
