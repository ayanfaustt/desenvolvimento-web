import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ListSummarie, UpdateSummarie } from "../../hooks/useSummarie";
import { Alert, Button, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { useUser } from "../../hooks/useContextUserId";
import { TagList } from "../../hooks/useListTag";

interface TagOption {
	value: string;
	label: string;
};

interface Tag {
	id: string;
	tag_name: string;
};

export default function EditSummarie() {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const { userId } = useUser();
	const location = useLocation();
	const { itemId, tagName } = location.state;
	const [resumeContent, setResumeContent] = useState({ summarieName: "", tagId: "", summarieContent: "" });
	const [initialTag, setInitialTag] = useState({ value: "", label: "" });
	const [oldTag, setOldTag] = useState({ value: "", label: "" });

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListSummarie(itemId).then((res) => {
					setResumeContent({ summarieName: res.data.summarie_name, tagId: res.data.tagId, summarieContent: res.data.summarie_content })
				})
				setInitialTag({ value: resumeContent.tagId, label: tagName })
				setOldTag({ value: resumeContent.tagId, label: tagName })
			} catch (err) {
				console.log(err)
			}
		};
		fetchResumeContent();
	}, []);

	const loadOptions = async (inputValue: string) => {
		if (userId) {
			try {
				const response = await TagList(userId);
				const options: TagOption[] = response.data.map((tag: Tag) => ({
					value: tag.id,
					label: tag.tag_name,
				}));
				return options.filter((option) =>
					option.label.toLowerCase().includes(inputValue.toLowerCase())
				);
			} catch (error) {
				console.error("Erro:", error);
				return [];
			};
		};
		return [];
	};

	const handleAsyncSelection = (option: TagOption | null) => {
		if (option) {
			console.log(option)
			setResumeContent((prevData) => ({
				...prevData,
				"tagId": option.value
			}))
			setInitialTag({ value: option.value, label: option.label })
		} else {
			setInitialTag(oldTag)
		}
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setResumeContent((prevContent) => ({
			...prevContent,
			summarieName: event.target.value,
		}));
	};

	const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setResumeContent((prevContent) => ({
			...prevContent,
			summarieContent: event.target.value,
		}));
	};

	const handleEditSummarie = () => {
		UpdateSummarie(itemId, resumeContent).then(res => {
			setShowAlert(true);

			setTimeout(() => {
				navigate("/summaries")
			}, 2000);

		})
	};

	return (
		<main className="resume">
			<SideBar />
			<div className="resume-content">
				<Form className="formEdit">
					<Form.Control
						type="text"
						value={resumeContent.summarieName}
						onChange={handleNameChange}
					/>

					<Form.Control
						as="textarea"
						type="text"
						value={resumeContent.summarieContent}
						rows={10}
						onChange={handleContentChange}
					/>
					<AsyncSelect
						loadOptions={loadOptions}
						onChange={handleAsyncSelection}
						defaultOptions
						placeholder="Digite para buscar..."
						isSearchable
						isClearable
						value={initialTag}
					/>

				</Form>
				<div>
					<Button onClick={handleEditSummarie}>
						Save changes
					</Button>
					{showAlert && (
						<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
							Summary changed!
						</Alert>
					)}
				</div>
			</div>
		</main>
	);
}