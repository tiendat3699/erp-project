function CheckBox({ labelLeft, labelRight }) {
    return (
        <>
            {labelLeft && <label>{labelLeft}</label>}
            <input type="checkbox" />
            {labelRight && <label>{labelRight}</label>}
        </>
    );
}

export default CheckBox;
