import "./Editor.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Button } from "@mui/material";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import {
    Save,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikethroughS,
    Code,
    FormatQuote,
    Link,
    FormatListBulleted,
    FormatListNumbered,
    FormatIndentIncrease,
    FormatIndentDecrease,
} from "@mui/icons-material";

import Panel from "../../components/Panel/Panel";

function Editor({ themeMode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = () => {
        // Save the blog post
    };

    return (
        <>
            {isOpen && (
                <Panel
                    themeMode={themeMode}
                    titleHeading="Editor"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <TextField
                            label="Content"
                            multiline
                            rows={10}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<FormatBold />}
                            >
                                Bold
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatItalic />}
                            >
                                Italic
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatUnderlined />}
                            >
                                Underline
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<StrikethroughS />}
                            >
                                Strikethrough
                            </Button>
                            <Button variant="outlined" startIcon={<Code />}>
                                Code
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatQuote />}
                            >
                                Quote
                            </Button>
                            <Button variant="outlined" startIcon={<Link />}>
                                Link
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatListBulleted />}
                            >
                                Bulleted List
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatListNumbered />}
                            >
                                Numbered List
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatIndentIncrease />}
                            >
                                Indent
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FormatIndentDecrease />}
                            >
                                Outdent
                            </Button>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={<Save />}
                        >
                            Save
                        </Button>
                    </Box>
                </Panel>
            )}
        </>
    );
}

Editor.propTypes = {
    themeMode: PropTypes.string,
};

export default Editor;
