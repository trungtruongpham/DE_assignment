//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
//@ts-ignore
import { Link } from 'react-router-dom';
import { isConstructorTypeNode } from "typescript";
import authorApi from "../../services/api/authorApi";
import { toastError, toastSuccess } from "../../services/toastService";
import AuthorModelPage from "../../types/models/AuthorModelPage";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";
import updateSrc from '../../assets/update-icon.png';
import deleteSrc from '../../assets/delete-icon.png';
import AuthorModel from "../../types/models/AuthorModel";
import PaginationSearchAuthorPage from "../../components/PaginationSearchAuthorPage";

const Author = () => {
  const history = useHistory();

  
  const [data, setData] = useState<AuthorModelPage[]>([]);

  
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 3;


  const fetchData = useCallback(() => {
    authorApi
      .getAllAuthors()
      .then((response) => {
        // console.log(response.data)
        setData(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [data.length]);

  // datas.push(<tr className="hidden" key={""}>
  //   {/* <td className="border border-blue-600">{""}</td> */}
  //   <td className="border border-blue-600">{""}</td>
  //   <td className="border border-blue-600">{""}</td>
  //   <td>{ }</td>
  //   <td>{ }</td>
  // </tr>)

  // listAuthors.forEach((author: AuthorModelPage) => {
  //   datas.push(
  //     <tr key={author.id}>
  //       {/* <td className="border border-blue-600">{category.id}</td> */}
  //       <td className="border border-blue-600 w-3/12 text-left" >{author.name}</td>
  //       <td className="border border-blue-600 w-8/12 text-left">{author.description}</td>
  //       <td className="border border-blue-600">
  //         <Link to={"/author/update/" + author.id} className="badge badge-warning float-left ml-3">
  //           <img src={updateSrc} className="" />
  //         </Link>
        
  //         <button className="float-right mr-3" onClick={() => { onDelete(author.id) }}>
  //           <img src={deleteSrc} alt="" />
  //         </button>
  //       </td>
  //     </tr>
  //   );
  // });

  // const onDelete = (id: string) => {
  //   Swal.fire({
  //     title: 'Are you sure to delete this author?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       authorApi
  //         .deleteAuthor(id)
  //         .then((res) => {
  //           console.log(res);
  //           if (res.status === 200) {
  //             toastSuccess("Delete  author success!");
  //             // window.location.reload();
  //             const removedList = listAuthors.filter((author: AuthorModelPage) => author.id !== id);
  //             setListAuthors(removedList);
  //           }
  //         })
  //         .catch((errors) => {
  //           toastError("Delete  author failed");
  //         });
  //     }
  //   })
  // };

  return (

    // <div className="related-items  items-start border mt-8 p-4 gap-y-5 bg-white">
    //   <br />
    //   <h1 className="mb-10 font-bold text-xl">AUTHOR PAGE</h1>

    //   <Link to={'/author/new-author'} className="py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-md text-white text-sm mt-8" >Add New</Link>
    //   <div className="flex flex-col">
    //     <table className='border-collapse border border-blue-800 mt-8 justify-center'>
    //       <thead className='bg-blue-400'>
    //         <tr>
    //           {/* <th className="border border-blue-600">ID</th> */}
    //           <th className="border border-blue-600">Name</th>
    //           <th className="border border-blue-600">Description</th>
    //           <th className="border border-blue-600"></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {datas}
    //       </tbody>
    //     </table>
    //   </div>
      
    // </div>

    <Fragment>
      <div className="related-items items-start border mt-8 gap-y-5 bg-white">
        <br />
        <h1 className="mb-10 font-bold text-xl">AUTHOR PAGE</h1>
        <Link to={'/author/new-author'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>

        <PaginationSearchAuthorPage  data={data} itemsPerPage={5} startFrom={15} searchByData={[
            { label: 'Search by name', value: 'name' },
            { label: 'Search by description', value: 'description' },
            
          ]} />
      </div>
    </Fragment>
  );
}
export default Author;
