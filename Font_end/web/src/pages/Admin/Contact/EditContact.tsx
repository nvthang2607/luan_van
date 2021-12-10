import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputBaseComponentProps,
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';
import {
	EditorState,
	convertToRaw,
	convertFromHTML,
	ContentState,
	DraftBlockRenderMap,
	ContentBlock,
	CompositeDecorator,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDropzone } from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { Close } from '@material-ui/icons';
import theme from '../../../utils/theme';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { CityGet, CommunePost, DistrictPost } from '../../../api/Address';
import { UpdateUserPost } from '../../../api/Admin/User';
import {
	CreateImagePost,
	CreateInformationPost,
	CreateProductPost,
	CreateProductTypePost,
	DeleteImageDelete,
	DeleteInformationDelete,
	EditProductTypePost,
	UpdateDescriptionPatch,
	UpdateImagePost,
	UpdateInformationPatch,
} from '../../../api/Admin/Product';
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuItem, Select } from '@mui/material';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { display } from '@mui/system';
import { CreateNewsPost, UpdateNewsPost } from '../../../api/Admin/News';
import { CreateSlidePost, UpdateSlidePost } from '../../../api/Admin/Slide';
interface ProfileInfoProps {
	dataEdit?: any;
	dataEditImage?: any;
	cancel?: (result: boolean) => void;
	create?: (result: boolean) => void;
	titleDialog?: string;
	dataBrand?: any;
}
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	errorContent: { border: '2px solid red' },
	titleInput: {
		fontWeight: 'bold',
		'&::after': {
			content: '"*"',
			display: 'inline-block',
			marginLeft: '5px',
			position: 'relative',
			bottom: '5px',
			color: theme.palette.secondary.main,
		},
	},
	displayDeleteImage: {
		display: 'block !important',
	},
	displayDeleteInformation: {
		display: 'block !important',
	},
	test: {
		display: 'none !important',
	},
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
	button: {},
	activeTagLi: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		color: `${theme.palette.primary.main} !important`,
	},
	tagLi: {
		paddingLeft: '35px',
	},
}));
interface NumberFormatCustomProps {
	inputRef: (instance: NumberFormat | null) => void;
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	prefix: any;
}
function NumberFormatCustom(props: NumberFormatCustomProps) {
	const { inputRef, onChange, prefix, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix={prefix}
		/>
	);
}
const EditContact: React.FC<ProfileInfoProps> = (props) => {
	const textToConvert = props?.dataEdit?.content || '';
	const blocksFromHTML = htmlToDraft(textToConvert);

	// const decorator = new CompositeDecorator([
	// 	{
	// 		strategy: findLinkEntities,
	// 		component: Link,
	// 	},
	// 	{
	// 		strategy: findImageEntities,
	// 		component: Image,
	// 	},
	// ]);
	const [content, setContent] = React.useState<any>(props.dataEdit.content);
	const [editorState, setEditorState] = React.useState<any>(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
		)
	);

	const classes = useStyles();
	const [valueFilter, setValueFilter] = React.useState({
		id: 0,
		value: 'Tat ca san pham',
		type: 'all',
	});
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openFilter = Boolean(anchorEl);
	const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseFilter = () => {
		setAnchorEl(null);
	};
	const schema = yup.object().shape({
		idProduct: yup
			.number()
			.typeError('idProduct must specify a number')
			.min(0, 'idProduct_must_be_greater_than_or_equal_to_0'),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [closeForm, setCloseForm] = React.useState(false);

	const [valueInformation, setValueInformation] = React.useState<any>(props.dataEdit?.informations);
	const [valueDeleteDescription, setValueDeleteDescription] = React.useState<any>([]);
	const [valueDeleteImage, setValueDeleteImage] = React.useState<any>([]);
	const [valueOption, setValueOption] = React.useState(props.dataEdit?.id_brand);
	const [manyUpload, setManyUpload] = React.useState(false);
	const [errUpload, setErrUpload] = React.useState(false);
	const [errContent, setErrContent] = React.useState(false);
	const [progress, setProgress] = React.useState(false);
	const [idHoverInformation, setIdHoverInformation] = React.useState(-1);
	const [idHoverImage, setIdHoverImage] = React.useState(-1);
	const [files, setFiles] = React.useState(props.dataEditImage);
	const [fileRejections, setFileRejections] = React.useState<any>([]);
	const [actionUpload, setActionUpload] = React.useState({ id: -1, name: '' });

	const { getRootProps, getInputProps, open } = useDropzone({
		// Disable click and keydown behavior
		accept: 'image/jpeg, image/png, image/jpg',
		// maxFiles: 1,
		noClick: true,
		noKeyboard: true,
		onDrop: (acceptedFiles, fileRejections) => {
			if (fileRejections?.length > 0) {
				setFileRejections(fileRejections);
			} else {
				if (actionUpload.name === 'create') {
					setManyUpload(false);
					setErrUpload(false);
					acceptedFiles.map((file: any) =>
						setFiles((files: any) =>
							files.concat({
								image: [
									Object.assign(file, {
										preview: URL.createObjectURL(file),
									}),
								],
								delete: false,
							})
						)
					);

					setFileRejections([]);
				} else if (actionUpload.name === 'update') {
					if (acceptedFiles?.length > 1) {
						setManyUpload(true);
						setErrUpload(false);
					} else {
						setManyUpload(false);
						setErrUpload(false);
						const filesNews: any = [...files];
						if (filesNews[actionUpload.id].id_product !== undefined) {
							filesNews[actionUpload.id].image = [
								Object.assign(acceptedFiles[0], {
									preview: URL.createObjectURL(acceptedFiles[0]),
								}),
							];
							setFiles(filesNews);
						} else {
							filesNews[actionUpload.id].image[0] = Object.assign(acceptedFiles[0], {
								preview: URL.createObjectURL(acceptedFiles[0]),
							});
							setFiles(filesNews);
						}
					}
				}
			}

			//setProgressUpload({ percent: 0, fileSize: '' });
		},
	});
	const onSubmit = async (data: any) => {
		console.log(data);
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {isSubmitting && (
				<CircularProgress
					color="secondary"
					style={{ position: 'absolute', top: '50%', left: '50%' }}
				/>
			)} */}

				<IconButton
					className={classes.closeButton}
					onClick={() => {
						props.cancel?.(false);
					}}
				>
					<Close />
				</IconButton>

				<DialogTitle>
					<Typography variant="h5">Nội dung liên hệ</Typography>
				</DialogTitle>
				<DialogContent dividers style={{ minHeight: '201px' }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography>{props.dataEdit.comment}</Typography>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="secondary"
							//disabled={true}
							style={{ position: 'relative', textTransform: 'inherit' }}
							onClick={() => {
								props.cancel?.(false);
							}}
						>
							Đóng
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
					</Grid>
				</DialogActions>

				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</form>
		</React.Fragment>
	);
};
export default EditContact;
