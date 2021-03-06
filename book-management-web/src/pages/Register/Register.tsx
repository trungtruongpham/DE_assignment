//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
import axiosPublicClient from "../../services/axios/axiosPublicClient";
import { toastError, toastSuccess } from "../../services/toastService";
const Register = () => {
  const history = useHistory();
  interface FormData {
    Name: string;
    Username: string;
    Password: string;
    Email: string;
    Phone: string;
    Address: string;
    Role: string;
  }

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: "onChange",
    reValidateModel: "onChange",
  });

  const onSubmit = handleSubmit(({ Name, Username, Password, Email, Phone, Address, Role }: FormData) => {
    Role = "User";
    axiosPublicClient
      .post("users/register", { Name, Username, Password, Email, Phone, Address, Role })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Register success!");
        }
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toastError(err.response.data.message);
      });
  });

  // const onSubmit = handleSubmit(({name, email, password}) => {
  //     console.log(name, email, password);
  // })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* <div className="text-center font-medium text-xl">
                    something
                </div> */}
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Register Form
        </div>
      </div>
      <div className="w-3/5 mx-auto mt-4 bg-white p-8 border border-gray-300 items-center">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <div className="w-full">
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Name <span className="text-red-700">(*)</span>
            </label>
            <input
              ref={register({
                required: true,
              })}
              name="Name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.Name?.type == "required" && "Name is required!"}
            </span>
          </div>
          <div className="w-full flex flex-grow gap-x-5">
            <div className="w-1/2">
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Username <span className="text-red-700">(*)</span>
              </label>
              <input
                ref={register({
                  required: true,
                })}
                name="Username"
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <span className="text-left items-start flex text-red-400">
                {errors.Username?.type == "required" && "Username is required!"}
              </span>
            </div>

            <div className="w-1/2">
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Password <span className="text-red-700">(*)</span>
              </label>
              <input
                ref={register({
                  required: true,
                  pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i
                })}
                name="Password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <span className="text-left items-start flex text-red-400">
                {errors.Password?.type == "required" && "Password is required!"}
                {errors.Password?.type == "pattern" && "Password is include 1 Uppercase, 1 Lowercase, 1 number and min 8 character!"}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-grow gap-x-5">
            <div className="w-1/2">
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Email <span className="text-red-700">(*)</span>
              </label>
              <input
                ref={register({
                  required: true,
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
                })}
                name="Email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <span className="text-left items-start flex text-red-400">
                {errors.Email?.type == "required" && "Email is required!"}
                {errors.Email?.type == "pattern" && "Email is invalid!"}
              </span>
            </div>

            <div className="w-1/2">
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Phone <span className="text-red-700">(*)</span>
              </label>
              <input
                ref={register({
                  required: true,
                  pattern: /^[0-9]+$/i,
                  maxLength: "15"
                })}
                name="Phone"
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <span className="text-left items-start flex text-red-400">
                {errors.Phone?.type == "required" && "Phone is required!"}
                {errors.Phone?.type == "pattern" && "Phone just only number!"}
                {errors.Phone?.type == "maxLength" && "Phone is max 15 chars!"}
              </span>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Address <span className="text-red-700">(*)</span>
            </label>
            <input
              ref={register({
                required: true,
              })}
              name="Address"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.Address?.type == "required" && "Address is required!"}
            </span>
          </div>

          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
