// FormPage1.tsx
'use Client';
"use strict";
exports.__esModule = true;
var formik_1 = require("formik");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var FormPage1_module_css_1 = require("./FormPage1.module.css");
var FormPage1 = function () {
    var router = navigation_1.useRouter();
    var formik = formik_1.useFormik({
        initialValues: {
            firstName: '',
            lastName: ''
        },
        onSubmit: function (values) {
            alert(JSON.stringify(values, null, 2));
            // try {
            //   await axios.post('/api/form1', values);
            //   router.push('/FormPage2');
            // } catch (error) {
            //   console.log('Error submitting form:', error);
            // }
        }
    });
    return (react_1["default"].createElement("form", { onSubmit: formik.handleSubmit },
        react_1["default"].createElement("div", { className: FormPage1_module_css_1["default"].formGroup },
            react_1["default"].createElement("label", { htmlFor: "firstName" }, "First Name:"),
            react_1["default"].createElement("input", { id: "firstName", name: "firstName", type: "firstName", onChange: formik.handleChange, value: formik.values.firstName })),
        react_1["default"].createElement("div", { className: FormPage1_module_css_1["default"].formGroup },
            react_1["default"].createElement("label", { htmlFor: "lastName" }, "Last Name:"),
            react_1["default"].createElement("input", { id: "lastName", name: "lastName", type: "lastName", onChange: formik.handleChange, value: formik.values.firstName })),
        react_1["default"].createElement("button", { type: "submit", className: FormPage1_module_css_1["default"].formButton }, "Next")));
};
exports["default"] = FormPage1;
