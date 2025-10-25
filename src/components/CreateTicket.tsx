import { useForm } from "react-hook-form";
import Modal from "./Modal"
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema, type Ticket } from "../types";
import { useEffect } from "react";

interface CreateTicketProps {
  onOpen: boolean;
  onCancel: () => void;
  onCreate: (data: Ticket) => Promise<void>;
  initialData?: Ticket | null;
  submitText?: string;
}


const CreateTicket = ({ onOpen, onCancel, onCreate, initialData = null, submitText = "Create" }: CreateTicketProps) => {

     const { register, handleSubmit, formState: { errors, }, reset } = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { status: "open" },
  });

  useEffect(() => {
    if (onOpen && initialData) {
      reset(initialData);
    }
    if (!onOpen) {
      reset({ status: "open" } as any);
    }
  }, [onOpen, initialData, reset]);

  const submit = handleSubmit(async (data: Ticket) => {
    await onCreate(data);
    reset({ status: "open" } as any);
  });

  return (
    <Modal
      isOpen={onOpen}
      title={initialData ? "Edit Ticket" : "Create New Ticket"}
      confirmText={submitText}
      cancelText="Cancel"
      onConfirm={() => void submit()}
      onCancel={onCancel}
      cancelButtonClass="bg-transparent text-primary"
      confirmButtonClass="bg-primary"
    >
      <form className="space-y-4" onSubmit={submit}>
          <div>
            <label htmlFor="title" className="block text-sm mb-1">
              Title
            </label>
            <input type="text" id="title" {...register("title")} placeholder="Title" className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="status" className="block text-sm mb-1">Status</label>
            <select {...register("status")} name="status" id="status" className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}

          </div>
          <div>
            <label htmlFor="description" className="block text-sm mb-1">
              Description
            </label>
            <textarea rows={5} id="description" {...register("description")} placeholder="Description(optional)" className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          
        </form>
      </Modal>
  )
}

export default CreateTicket