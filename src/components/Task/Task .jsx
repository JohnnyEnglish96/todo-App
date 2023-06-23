/* eslint-disable jsx-a11y/control-has-associated-label */

import PropTypes from 'prop-types';

function Task({ todoListData, complited, deleted, editBtn, id }) {
  const idName = `${id}toggle`;
  return (
    <div className="view">
      <input className="toggle" id={idName} type="checkbox" onClick={complited} />
      <label htmlFor={idName}>
        <span className="description">{todoListData.description}</span>
        <span className="created">{todoListData.created}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={editBtn} />
      <button type="button" className="icon icon-destroy" onClick={deleted} />
    </div>
  );
}

export default Task;

Task.propTypes = {
  todoListData: PropTypes.object.isRequired,
  complited: PropTypes.func.isRequired,
  deleted: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};
