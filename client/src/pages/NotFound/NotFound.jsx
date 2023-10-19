import "./NotFound.css";
import PropTypes from "prop-types";

const NotFound = ({ themeMode }) => {
    return (
        <div className={`NotFound__container ${themeMode}`}>
            <div className="NotFound__header">
                <h3 className="NotFound__title">
                    <b>404 NotFound</b>
                </h3>
            </div>
        </div>
    );
};

NotFound.propTypes = {
    themeMode: PropTypes.string,
};

export default NotFound;
