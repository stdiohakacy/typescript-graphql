import React from "react";
import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

const FileUpload = () => {
      const [singleUpload] = useMutation(SINGLE_UPLOAD, {
          onCompleted: (data) => console.log(data),
      });
      const handleFileChange = (e) => {
        const file = e.target.files;
        if (!file) return;
        singleUpload({ variables: { file: file[0] } });
      };
   return (
   <>
    <input
      type="file"
      name="GraphQLUploadForMedium"
      onChange={handleFileChange}
    />
  </>
 );
};
export default FileUpload;