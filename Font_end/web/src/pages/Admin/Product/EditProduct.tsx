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
const EditProduct: React.FC<ProfileInfoProps> = (props) => {
	const textToConvert = props?.dataEdit?.description || '';
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
	const [content, setContent] = React.useState<any>();
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
		name: yup.string().required('Tên sản phẩm là bắt buộc'),
		quantity: yup
			.number()
			.typeError('Số lượng là 1 ký số')
			.min(0, 'Số lượng lớn hơn hoặc bằng 0')
			.integer('Số lượng là 1 số nguyên'),
		unit_price: yup
			.number()
			.typeError('Giá sản phẩm là 1 ký số')
			.min(0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0'),
		promotion_price: yup
			.number()
			.typeError('Giá sản phẩm là 1 ký số')
			.min(0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0'),
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
	const onSubmitInformation = async (data: any) => {
		// if (props.dataEdit.id === 0) {
		// 	const response = await CreateProductTypePost({ name: data.name });
		// 	if (response) {
		// 		if (response.errorCode === null) {
		// 			Swal.fire({
		// 				icon: 'success',
		// 				title: 'Tao moi thanh cong',
		// 			});
		// 			props.create?.(true);
		// 		} else {
		// 			Swal.fire({
		// 				icon: 'error',
		// 				title: 'Co loi xay ra',
		// 			});
		// 			props.create?.(false);
		// 		}
		// 	}
		// } else {
		// 	const response = await EditProductTypePost({ id: props.dataEdit.id, name: data.name });
		// 	if (response) {
		// 		if (response.errorCode === null) {
		// 			Swal.fire({
		// 				icon: 'success',
		// 				title: 'Cap nhat thong tin thanh cong',
		// 			});
		// 			props.create?.(true);
		// 		} else {
		// 			Swal.fire({
		// 				icon: 'error',
		// 				title: 'Co loi xay ra',
		// 			});
		// 			props.create?.(true);
		// 		}
		// 	}
		// }
		let description = '';
		description = content === undefined ? props?.dataEdit?.description : content;

		const response = await UpdateInformationPatch({
			id: props.dataEdit?.id_product,
			id_brand: valueOption,
			description: description,
			name: data.name,
			unit_price: data.unit_price,
			promotion_price: data.promotion_price,
		});
		if (response) {
			if (response.errorCode === null) {
				toast.success('Cập nhật thông tin thành công');
			} else {
				toast.error('Có lỗi xảy ra');
			}
		}
	};
	const onSubmitImage = async () => {
		const dataUpdate: any = [];
		const dataCreate: any = [];
		files?.map((item: any) => {
			if (item.id === undefined) {
				item.delete === false && dataCreate.push(item);
			} else {
				item.delete === false && dataUpdate.push(item);
			}
		});
		if (dataCreate?.length > 0) {
			dataCreate?.map((item: any, index: number) => {
				item.image?.map((itemChildren: any) => {
					const formData = new FormData();
					formData.append('image', itemChildren);
					formData.append('id_product', props.dataEdit.id_product.toString());
					formData.append('parent', '0');

					CreateImagePost(formData);
				});
			});
		}
		if (valueDeleteImage?.length > 0) {
			valueDeleteImage?.map((item: any) => {
				DeleteImageDelete(item.id);
			});
		}
		if (dataUpdate?.length > 0) {
			dataUpdate?.map((item: any) => {
				if (item.image?.length === 1) {
					item.image?.map((itemChildren: any) => {
						const formData = new FormData();
						formData.append('image', itemChildren);
						formData.append('id', item.id);
						formData.append('id_product', props.dataEdit.id_product.toString());
						UpdateImagePost(formData);
					});
				}
			});
		}
		Swal.fire({
			icon: 'success',
			title: 'Cập nhật thông tin thành công',
		});
		props.create?.(true);
	};
	const onSubmitDescription = async (data: any) => {
		const dataUpdate: any = [];
		const dataCreate: any = [];
		valueInformation?.map((item: any) => {
			item.id_product !== undefined &&
				dataUpdate.push({
					id_product: item.id_product,
					id: item.id,
					name: item.name,
					content: item.content,
				});
		});
		valueInformation?.map((item: any) => {
			item.id_product === undefined &&
				dataCreate.push({
					name: item.name,
					content: item.content,
				});
		});

		if (dataUpdate?.length > 0) {
			const response = await UpdateDescriptionPatch({ data: dataUpdate });
			if (response) {
				if (response.errorCode === null) {
					Swal.fire({
						icon: 'success',
						title: 'Cập nhật thông tin thành công',
					});
					props.create?.(true);
				} else {
					toast.error('Có lỗi xảy ra khi cập nhật thông tin');
				}
			}
		}
		if (dataCreate?.length > 0) {
			const response = await CreateInformationPost({
				id_product: props.dataEdit.id_product,
				data: dataCreate,
			});
			if (response) {
				if (response.errorCode === null) {
					Swal.fire({
						icon: 'success',
						title: 'Cập nhật thông tin thành công',
					});
					props.create?.(true);
				} else {
					toast.error('Có lỗi xảy ra khi cập nhật thông tin');
				}
			}
		}
		if (valueDeleteDescription?.length > 0) {
			valueDeleteDescription?.map((item: any) => {
				DeleteInformationDelete(item.id);
			});
		}
	};
	console.log('files', files);

	return (
		<React.Fragment>
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
				<Typography variant="h5">{props.titleDialog}</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<form onSubmit={handleSubmit(onSubmitInformation)}>
							<Card variant="outlined" style={{ padding: '10px' }}>
								<Grid container spacing={3}>
									{isSubmitting && (
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', top: '50%', left: '50%' }}
										/>
									)}
									<Grid item xs={12}>
										<Typography variant="h6" gutterBottom>
											Thông tin sản phẩm
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1" gutterBottom className={classes.titleInput}>
											Tên sản phẩm
										</Typography>
										<Controller
											control={control}
											name="name"
											defaultValue={props.dataEdit.name}
											render={({ field: { onChange } }) => (
												<TextField
													variant="outlined"
													fullWidth
													name="name"
													defaultValue={props.dataEdit.name}
													id="name"
													size="small"
													error={errors.name ? true : false}
													helperText={errors.name?.message}
													onChange={(e) => onChange(e.target.value)}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={6}>
										<Typography variant="body1" gutterBottom className={classes.titleInput}>
											Loại sản phẩm
										</Typography>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={valueOption}
											fullWidth
											size="small"
											color="primary"
											onChange={(event) => {
												setValueOption(event?.target.value);
											}}
										>
											{props.dataBrand.data?.map((item: any) => {
												return [
													<MenuItem value="" disabled style={{ fontWeight: 'bold', color: 'red' }}>
														{item.image?.length === 1 &&
															item.image?.map((item: any) => {
																return item.name;
															})}
													</MenuItem>,
													item.brand?.map((itemChildren: any) => {
														return (
															<MenuItem value={itemChildren.id} style={{ paddingLeft: '35px' }}>
																{itemChildren.name}
															</MenuItem>
														);
													}),
												];
											})}
										</Select>
									</Grid>

									<Grid item xs={6}>
										<Typography variant="body1" gutterBottom className={classes.titleInput}>
											Giá gốc
										</Typography>
										<Controller
											control={control}
											name="unit_price"
											defaultValue={props.dataEdit.unit_price}
											render={({ field: { onChange } }) => (
												<TextField
													variant="outlined"
													fullWidth
													name="unit_price"
													size="small"
													defaultValue={props.dataEdit.unit_price}
													id="unit_price"
													InputProps={{
														inputComponent: NumberFormatCustom as any,
														endAdornment: <InputAdornment position="end">VND</InputAdornment>,
													}}
													error={errors.unit_price ? true : false}
													helperText={errors.unit_price?.message}
													onChange={(e) => onChange(e.target.value)}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1" gutterBottom className={classes.titleInput}>
											Giá khuyến mãi
										</Typography>
										<Controller
											control={control}
											name="promotion_price"
											defaultValue={props.dataEdit.promotion_price}
											render={({ field: { onChange } }) => (
												<TextField
													variant="outlined"
													fullWidth
													name="promotion_price"
													size="small"
													defaultValue={props.dataEdit.promotion_price}
													id="promotion_price"
													InputProps={{
														inputComponent: NumberFormatCustom as any,
														endAdornment: <InputAdornment position="end">VND</InputAdornment>,
													}}
													error={errors.promotion_price ? true : false}
													helperText={errors.promotion_price?.message}
													onChange={(e) => onChange(e.target.value)}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
											Mô tả
										</Typography>

										<Box style={{ padding: '10px' }}>
											<Editor
												editorState={editorState}
												wrapperClassName="demo-wrapper"
												editorClassName="demo-editor"
												editorStyle={{ display: 'grid', maxHeight: '400px' }}
												onEditorStateChange={(editorState) => {
													setEditorState(editorState);
													setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
												}}
											/>
										</Box>
									</Grid>

									<Grid item xs={12}>
										<Button
											variant="contained"
											color="primary"
											size="small"
											type="submit"
											disabled={isSubmitting}
											style={{ textTransform: 'inherit' }}
										>
											Cập nhật
										</Button>
									</Grid>
								</Grid>
							</Card>
						</form>
					</Grid>
					<Grid item xs={12}>
						<form onSubmit={handleSubmit(onSubmitImage)}>
							<Card variant="outlined" style={{ padding: '10px' }}>
								<Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
									Ảnh sản phẩm
								</Typography>

								{manyUpload && (
									<FormHelperText error style={{ paddingLeft: '10px', paddingTop: '10px' }}>
										Không được chọn nhiều hơn 1 ảnh
									</FormHelperText>
								)}
								{errUpload && (
									<FormHelperText error style={{ paddingLeft: '10px', paddingTop: '10px' }}>
										Vui lòng chọn ít nhất 1 ảnh
									</FormHelperText>
								)}
								<Box
									style={{
										marginLeft: '26px',
										maxHeight: '500px',
										overflowX: 'clip',
										overflowY: 'auto',
									}}
								>
									<Grid container spacing={3} style={{ marginTop: '14px' }}>
										<Grid item xs={12}>
											<Grid container spacing={3}>
												{files?.map((item: any, index: number) => {
													return (
														<Grid
															item
															xl={4}
															lg={4}
															md={4}
															sm={6}
															xs={6}
															style={{ display: 'grid' }}
															className={clsx(classes.button, item.delete === true && classes.test)}
														>
															<Card
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
																variant="outlined"
															>
																<div {...getRootProps()} style={{ textAlign: 'center' }}>
																	<input {...getInputProps()} />
																	<Box>
																		<Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>
																			{index === 0 ? 'Ảnh chính: ' : `Ảnh mô tả ${index}:`}
																		</Typography>
																		<Button
																			variant="contained"
																			color="default"
																			onClick={() => {
																				open();
																				setActionUpload({ id: index, name: 'update' });
																			}}
																			style={{ textTransform: 'initial' }}
																		>
																			Cập nhật
																		</Button>
																	</Box>

																	<Typography
																		style={{
																			height: '47px',
																			overflow: 'hidden',
																			display: '-webkit-box',
																			textOverflow: 'ellipsis',
																			WebkitLineClamp: 2,
																			WebkitBoxOrient: 'vertical',
																			marginTop: '10px',
																		}}
																	>
																		{item.id_product !== undefined
																			? item.image.length === 1
																				? item.image?.map((itemChildren: any) => {
																						return itemChildren.name;
																				  })
																				: `${item.image.substring(
																						item.image.lastIndexOf('/') + 1,
																						item.image.length
																				  )}`
																			: item.image?.map((itemChildren: any) => {
																					return itemChildren.name;
																			  })}
																	</Typography>
																	<Box
																		style={{
																			display: 'inline-flex',
																			justifyContent: 'center',
																			position: 'relative',
																			cursor: 'pointer',
																		}}
																		onMouseOver={() =>
																			index === 0 ? setIdHoverImage(-1) : setIdHoverImage(index)
																		}
																		onMouseOut={() => setIdHoverImage(-1)}
																	>
																		<img
																			src={
																				item.id_product !== undefined
																					? item.image.length === 1
																						? item.image?.map((itemChildren: any) => {
																								return itemChildren.preview;
																						  })
																						: `http://localhost:8000${item.image}`
																					: item.image?.map((itemChildren: any) => {
																							return itemChildren.preview;
																					  })
																			}
																			style={{
																				display: 'block',
																				width: '100px',
																				marginTop: '10px',
																			}}
																		/>

																		<Tooltip
																			title="Xóa"
																			placement="top-start"
																			style={{
																				position: 'absolute',
																				backgroundColor: '#c1c1c1',
																				top: 0,
																				right: '-13px',
																				padding: '1px',
																				display: 'none',
																			}}
																			className={clsx(
																				classes.button,
																				idHoverImage === index && classes.displayDeleteImage
																			)}
																			onClick={() => {
																				const filesNew: any = [...files];
																				const dataDelete: any = [...valueDeleteImage];
																				if (filesNew[index].id_product !== undefined) {
																					dataDelete.push({ id: filesNew[index].id });
																				}
																				setValueDeleteImage(dataDelete);
																				filesNew[index].delete = true;
																				setFiles(filesNew);
																			}}
																		>
																			<IconButton>
																				<CloseIcon style={{ color: 'red' }} />
																			</IconButton>
																		</Tooltip>
																	</Box>
																</div>
															</Card>
														</Grid>
													);
												})}
												<Grid
													item
													xs={4}
													style={{
														display: 'grid',
													}}
												>
													<Card
														variant="outlined"
														style={{
															display: 'grid',
															justifyContent: 'center',
															alignItems: 'center',
														}}
														onClick={() => {
															open();
															setActionUpload({ id: -1, name: 'create' });
														}}
													>
														<div {...getRootProps()}>
															<input {...getInputProps()} />

															<Box style={{ textAlign: 'center' }}>
																<AddCircleOutlineIcon
																	style={{ fontSize: '60px', color: '#c1c1c1' }}
																/>
																<Typography variant="h6" style={{ color: '#c1c1c1' }}>
																	Thêm ảnh
																</Typography>
															</Box>
														</div>
													</Card>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										size="small"
										type="submit"
										disabled={isSubmitting}
										style={{ textTransform: 'inherit' }}
									>
										Cập nhật
									</Button>
								</Grid>
							</Card>
						</form>
					</Grid>
					<Grid item xs={12}>
						<form onSubmit={handleSubmit(onSubmitDescription)}>
							<Card variant="outlined" style={{ padding: '10px' }}>
								<Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
									Thông số kỹ thuật
								</Typography>
								<Box
									style={{
										marginLeft: '26px',
										maxHeight: '500px',
										overflowX: 'clip',
										overflowY: 'auto',
									}}
								>
									<Grid container spacing={3} style={{ marginTop: '14px' }}>
										{valueInformation?.map((item: any, index: number) => {
											return (
												<Grid
													item
													xs={12}
													onMouseOver={() => setIdHoverInformation(index)}
													onMouseOut={() => setIdHoverInformation(-1)}
												>
													<Grid container spacing={3}>
														<Grid item xs={5}>
															<TextField
																variant="outlined"
																fullWidth
																name={item.id}
																value={item.name}
																size="small"
																onChange={(e) => {
																	const newData = [...valueInformation];
																	newData[index].name = e.target.value;
																	setValueInformation(newData);
																}}
															/>
														</Grid>
														<Grid item xs={6}>
															<TextField
																variant="outlined"
																fullWidth
																name={item.id}
																value={item.content}
																size="small"
																onChange={(e) => {
																	const newData = [...valueInformation];
																	newData[index].content = e.target.value;
																	setValueInformation(newData);
																}}
															/>
														</Grid>

														<Grid
															item
															xs={1}
															style={{
																display: 'none',
																color: 'red',
																justifyContent: 'flex-end',
																alignItems: 'center',
															}}
															className={clsx(
																classes.button,
																idHoverInformation === index && classes.displayDeleteInformation
															)}
														>
															<Tooltip
																title="Xóa"
																placement="top-start"
																onClick={() => {
																	const newData = [...valueInformation];
																	const newDelete = [...valueDeleteDescription];

																	if (newData[index].id !== undefined) {
																		newDelete.push({ id: newData[index].id });
																	}
																	console.log('newDelete', newDelete);
																	newData.splice(index, 1);
																	setValueInformation(newData);
																	setValueDeleteDescription(newDelete);
																}}
															>
																<IconButton>
																	<CloseIcon style={{ color: 'red' }} />
																</IconButton>
															</Tooltip>
														</Grid>
													</Grid>
												</Grid>
											);
										})}
									</Grid>
								</Box>
								<Grid item xs={6}>
									<Button
										style={{ marginTop: '10px', textTransform: 'inherit' }}
										onClick={() => {
											setValueInformation((valueInformation: any) =>
												valueInformation.concat({ name: '', content: '' })
											);
											console.log('valueInformation', valueInformation);
										}}
										variant="contained"
										color="primary"
									>
										Tạo thẻ mới
									</Button>
									&nbsp;
									<Button
										style={{ marginTop: '10px', textTransform: 'inherit' }}
										type="submit"
										variant="contained"
										color="secondary"
										disabled={isSubmitting}
									>
										Cập nhật
									</Button>
								</Grid>
							</Card>
						</form>
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
		</React.Fragment>
	);
};
export default EditProduct;
