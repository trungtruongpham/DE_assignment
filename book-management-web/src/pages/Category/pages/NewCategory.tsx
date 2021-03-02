//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useHistory } from "react-router-dom";
import categoryApi from "../../../services/api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import NewCategoryFormData from "../../../types/form/NewCategoryFormData";
import { toastError, toastSuccess } from "../../../services/toastService";

const NewCategory = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm<NewCategoryFormData>({
    mode: "onChange",
  });

  const onSubmit = (formData: NewCategoryFormData) => {
    console.log(formData);

    categoryApi
      .addNewCategory(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new category success!");
          history.push("/category");
        }
      })
      .catch((errors) => {
        toastError("Create new category failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Create Category Form
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Name
            </label>
            <input
              ref={register()}
              // style={{borderColor: errors.name ? "red":""}}
              // ref={register()}
              name="Name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {/* {errors.name && "Username is invalid"} */}
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Details
            </label>
            <input
              ref={register({required: true})}
              name="Details"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
