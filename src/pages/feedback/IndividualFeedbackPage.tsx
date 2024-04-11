import React from 'react';
import { useParams } from 'react-router-dom';
export const IndividualFeedbackPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div>ind veedback page: {id}</div>
      {/* Dialog for adding a comment to a feedback */}
      {/* <Dialog open={Boolean(selectedFeedback)} onClose={handleCloseCommentDialog}> */}
      {/*   <DialogTitle>Add Comment</DialogTitle> */}
      {/*   <DialogContent> */}
      {/*     <TextField */}
      {/*       autoFocus */}
      {/*       margin="dense" */}
      {/*       id="comment" */}
      {/*       label="Comment" */}
      {/*       type="text" */}
      {/*       fullWidth */}
      {/*       variant="outlined" */}
      {/*       value={comment} */}
      {/*       onChange={(e) => setComment(e.target.value)} */}
      {/*     /> */}
      {/*   </DialogContent> */}
      {/*   <DialogActions> */}
      {/*     <Button onClick={handleCloseCommentDialog}>Cancel</Button> */}
      {/*     <Button onClick={handleCommentSubmit}>Submit Comment</Button> */}
      {/*   </DialogActions> */}
      {/* </Dialog> */}
    </div>
  );
};
