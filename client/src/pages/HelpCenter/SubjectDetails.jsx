import "./SubjectDetails.css";
import PropTypes from "prop-types";

const SubjectDetails = ({ header, content }) => {
    return (
        <div className="SubjectDetails">
            <header className="SubjectDetails__header">{header}</header>
            <hr style={{ width: "100%" }}></hr>
            <div className="SubjectDetails__content">{content}</div>
        </div>
    );
};

SubjectDetails.propTypes = {
    content: PropTypes.string,
    header: PropTypes.string,
};

export default SubjectDetails;
