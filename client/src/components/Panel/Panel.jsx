import "./Panel.css";
import PropTypes from "prop-types";
import CloseButton from "../CloseButton/CloseButton";

/**
 *
 * @param {string} themeMode to choose between light or dark mode.
 * @param {number} width of the container, options are: 25, 50, 75, 100.
 *
 * @param {string} titleHeading to go on the header of the component.
 * @param {string} contentHeading to go on the content of the component.
 *
 * @param {boolean} isOpen - boolean state use to open or close the component
 * @param {function} setIsOpen - function used to change the state to open and close the component
 *
 * @returns Panel component.
 */

const Panel = ({
    themeMode,
    width,
    titleHeading,
    contentHeading,
    isOpen,
    setIsOpen,
    dataTestId,
    children,
}) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    const getClassNameFromWidthProp = (width) => {
        let widthClassName = "";
        if (!width) return widthClassName;

        if (width === 100) widthClassName = "w-100";
        if (width === 75) widthClassName = "w-75";
        if (width === 50) widthClassName = "w-50";
        if (width === 25) widthClassName = "w-25";
        return widthClassName;
    };

    return (
        <>
            {isOpen && (
                <div
                    data-testid={dataTestId}
                    className={`Panel ${themeMode}  ${getClassNameFromWidthProp(
                        width
                    )}`}
                >
                    <div className={`Panel__header ${themeMode}`}>
                        {titleHeading && (
                            <h3 className={`Panel__title`}>{titleHeading}</h3>
                        )}
                        <CloseButton handleClose={handleClose} />
                    </div>
                    <div className={`Panel__content`}>
                        {contentHeading && (
                            <h3 className={`Panel__content-heading`}>
                                {contentHeading}
                            </h3>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

Panel.propTypes = {
    themeMode: PropTypes.string,
    width: PropTypes.number,
    titleHeading: PropTypes.string,
    contentHeading: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    dataTestId: PropTypes.string,
    children: PropTypes.node,
};

export default Panel;
