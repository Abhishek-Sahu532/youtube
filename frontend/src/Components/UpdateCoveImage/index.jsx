import React, { useEffect } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title from "../../Title";
import {  updateCoverImage } from "../../actions/UserAction";

export const UpdateCoverImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state)=> state.user)
  const { error, success, loading } = useSelector((state)=> state.updateCoverImage)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const myForm = new FormData();
    myForm.set("coverImage", data.coverImage[0]);
    dispatch(updateCoverImage(myForm))
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success('Cover Image Changed Successfully');
      navigate(`/channel/${user?.username}`)
      
    }
  }, [toast, error, success]);

  return (
    <Card className="w-96 mx-auto  mt-24">
      <Title title="Reset Password" />
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-start w-full mt-2.5 mb-[7px] gap-[31px]"
        >
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-center justify-start w-full gap-6">
              <div className="flex flex-col items-start justify-start w-full gap-3.5">
                <div className="flex flex-row justify-between items-center w-full">
                  <Typography className="text-2xl font-quicksand tracking-[-0.72px] text-primarybg font-semibold">
                  Update CoverImage
                  </Typography>
                </div>
                <p className=" text-primarybg font-semibold font-quicksand ">
                Pleaser select an Image
                </p>
              </div>
              
            
              <input
              type="file"
              {...register("coverImage" ,{
                required : 'File is required'
              })}
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
              {errors.coverImage && (
                <p className="my-2 text-red-600">
                  {errors.coverImage.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full bg-primarybg font-quicksand text-md font-bold"> {loading ? 'Updating...' : 'Update Cover Image'}
                   </Button>
        </form>
      </div>
    </Card>
  );
};
