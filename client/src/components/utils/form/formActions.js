export const validate = (element, formdata = []) => {
    let error = [true, ''];
    // console.log(formdata.password.value)

    if (element.validation.email) {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = re.test(String(element.value).toLowerCase());
        const message = ` ${!valid ? 'Invalid Email' : '' }`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() == formdata[element.validation.confirm].value
        const message = ` ${!valid ? 'Passwords do not match' : '' }`
        error = !valid ? [valid, message] : error;

    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = ` ${!valid ? 'This field is required' : '' }`
        error = !valid ? [valid, message] : error;

    }


    return error

}


export const update = (element, formdata, formName) => {
    const newformdata = {
        ...formdata
    };

    const newElement = {
        ...newformdata[element.id]
    }
    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newformdata[element.id] = newElement;
    return newformdata;
}


export const generateData = (formdata, formName) => {
    let dataToSubmit = {};
    for (let key in formdata) {
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formdata[key].value
        }

    }
    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;
    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid;

    }
    return formIsValid;
}

export const populateOptionFields = (formdata, array = [], field) => {
    const newArray = [];
    const newFormdata = {
        ...formdata
    };
    for (let i = 0; i < array.length; i++) {
        newArray.push({
            value: array[i]['name'],
            key: array[i]['_id']
        })
    }

    newFormdata[field].config.options = newArray;

    return newFormdata;
}

export const resetFields = (formdata, formName) => {
    const newFormdata = {
        ...formdata
    };
    for (let key in newFormdata) {
        if (key === 'images') {
            newFormdata[key].value = [];

        } else {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        }
    }
    return newFormdata
}