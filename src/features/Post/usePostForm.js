import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOutsideClick } from "../../hook/useOutsideClick";

export function usePostForm(onSubmit, data) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "TEXT";

  const [displaySearch, setDisplaySearch] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isShowDeleteBtn, setShowDeleteBtn] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: data?.title || "",
    text: data?.text || "",
    topic_id: data?.topic || "",
    image: data?.image || null,
  });
  const postOptions = [
    { key: "TEXT", label: "Text" },
    { key: "IMAGE", label: "Image" },
  ];
  /* ---------------------- HANDLERS ---------------------- */

  function closeSearchBar() {
    setDisplaySearch(false);
  }
  const ref = useOutsideClick(closeSearchBar);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = Array.from(e.target.files);
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setIsDragging(false);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleMouseEnter() {
    setShowDeleteBtn(true);
  }

  function handleMouseLeave() {
    setShowDeleteBtn(false);
  }

  function handleCancelImage(e) {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, image: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.text) {
      setError("Title and content are required");
      return;
    }

    setError("");
    console.log(formData);
    if (onSubmit) onSubmit(formData);

    // Reset form
    setFormData({
      title: "",
      text: "",
      topic_id: "",
      image: null,
    });
  }

  /* ---------------------- EXPORT ---------------------- */

  return {
    type,
    formData,
    setFormData,
    error,

    displaySearch,
    setDisplaySearch,
    isDragging,
    isShowDeleteBtn,
    ref,
    postOptions,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleMouseEnter,
    handleMouseLeave,
    handleCancelImage,
    handleSubmit,
  };
}
