import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

var icons = Quill.import('ui/icons');
icons['undo'] = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
</svg>`;
icons['redo'] = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
</svg>`;

function Editor({ options, placeholder, ...props }) {
    const ref = useRef();

    const Undo = () => {
        const editor = ref.current.getEditor();
        return editor.history.undo();
    };
    const Redo = () => {
        const editor = ref.current.getEditor();
        return editor.history.redo();
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ color: [] }, { background: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                    ['link'],
                    ['clean'],
                    ['undo', 'redo'],
                ],
                handlers: {
                    undo: Undo,
                    redo: Redo,
                },
            },
        }),
        [],
    );

    return (
        <ReactQuill ref={ref} theme="snow" modules={{ ...modules, ...options }} placeholder={placeholder} {...props} />
    );
}

export default Editor;
