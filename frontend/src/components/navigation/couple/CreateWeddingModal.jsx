import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../common/Button";
import Input from "../../common/Input";


import { coupleStart } from "../../../context/slices/coupleSlice";
import { createWedding } from "../../../api/couple.api";

const CreateWeddingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    weddingName: "",
    brideName: "",
    groomName: "",
    weddingDate: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(coupleStart());
      setSubmitting(true);

      const res = await createWedding(form);
      console.log(res);
      dispatch(setWedding(res.data.wedding));
      onClose();
    } catch (error) {
      dispatch(
        coupleFailure(
          error.response?.data?.message || "Failed to create wedding"
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#9E3A4A] mb-4">
          Create Wedding
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <Input label="Wedding Name" name="weddingName" value={form.weddingName} onChange={handleChange} />
          <Input label="Bride Name" name="brideName" value={form.brideName} onChange={handleChange} />
          <Input label="Groom Name" name="groomName" value={form.groomName} onChange={handleChange} />
          <Input type="date" label="Wedding Date" name="weddingDate" value={form.weddingDate} onChange={handleChange} />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWeddingModal;
