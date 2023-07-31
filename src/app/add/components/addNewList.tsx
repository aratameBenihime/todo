"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  listName: Yup.string()
    .trim()
    .required("List Name is required")
    .matches(
      /\S+/,
      "List Name must contain at least one non-whitespace character"
    ),
  description: Yup.string()
    .trim()
    .matches(/\S*/, "Description must not contain only whitespace"),
  selectedOption: Yup.string().required("A List Type must be selected"),
});

export default function AddNewListForm() {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_APP_URL + "/api/list/new";

  type myForm = {
    listName: string;
    description: string;
    selectedOption: string;
  };

  const initialValues = {
    listName: "",
    description: "",
    selectedOption: "",
  };

  const handleSubmit = async (values: myForm) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.listName,
        userID: "kaustavkakoty4@gmail.com",
        description: values.description,
        listType: values.selectedOption,
      }),
    });
    if (response.ok) {
      router.refresh();
      router.push(`/list/${values.selectedOption}/${values.listName}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form className="px-[20px] mt-[5rem]">
          <div>
            <div className="flex flex-row items-baseline">
              <label
                htmlFor="listName"
                className="w-[88px] text-[15px] font-medium text-[#6f6f6f] relative top-[7px]"
              >
                List Name
              </label>
              <Field
                type="text"
                id="listName"
                name="listName"
                className="border-b border-[#9a9a9a] appearance-none flex-1 focus:outline-none ml-5"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="listName"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mt-8 flex flex-row items-baseline">
            <label
              htmlFor="description"
              className="w-[88px]  text-[15px]font-medium text-[#6f6f6f] relative top-[7px]"
            >
              Description
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              className="border-b border-[#9a9a9a] appearance-none flex-1 focus:outline-none ml-5"
              autoComplete="off"
            />
            <ErrorMessage
              name="description"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mt-8 ">
            <div>
              <label className="text-[15px] font-medium text-[#6f6f6f]">
                Select list type
              </label>
              <div className="mt-3">
                <label>
                  <Field
                    type="radio"
                    name="selectedOption"
                    value="workspace"
                    className="mr-3"
                  />
                  Workspace
                </label>
              </div>
              <div>
                <label>
                  <Field
                    type="radio"
                    name="selectedOption"
                    value="private"
                    className="mr-3 text-[#6f6f6f]"
                  />
                  Private
                </label>
              </div>
              <div>
                <label>
                  <Field
                    type="radio"
                    name="selectedOption"
                    value="shared"
                    className="mr-3"
                  />
                  Shared
                </label>
              </div>
            </div>
            <ErrorMessage
              name="selectedOption"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <span className="flex flex-row justify-center mt-10">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-1.5 rounded-md shadow-sm font-medium text-white ${
                isValid ? "bg-[#4385F4]" : "bg-[#4ba6efb0]"
              }`}
            >
              Add
            </button>
          </span>
        </Form>
      )}
    </Formik>
  );
}
