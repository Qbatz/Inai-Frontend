
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CUSTOMER_SAGA, EDIT_CUSTOMER_SAGA, RESET_CODE, GET_MASTER_SAGA } from '../../Utils/Constant';
import { useNavigate } from 'react-router-dom';
import { InfoCircle } from "iconsax-react";


function AddCustomer({ handleClose, editCustomerDetails }) {


    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [value, setValue] = useState(1);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        businessName: '',
        surName: '',
        contactPerson: '',
        countryCode: '',
        contactNumber: '',
        emailId: '',
        designation: '',
        gstVat: '',
        cin: '',
        pan: '',
        tan: '',
        legalStatus: '',
    });


    const [natureOfBusiness, setNatureOfBusiness] = useState([]);


    const [contacts, setContacts] = useState([
        // { name: "", number: "", email: "", designation: "" }
    ]
    );



    console.log("natureOfBusiness", natureOfBusiness)

    console.log("state", state)



    const [bankDetailsList, setBankDetailsList] = useState([
        {
            beneficiaryCurrency: "",
            beneficiaryName: formData?.contactPerson,
            accountNumber: "",
            bankName: "",
            ifscCode: "",
            swiftCode: "",
            bankAddress1: "",
            bankAddress2: "",
            bankCountry: "",
            intermediaryRoutingBank: "",
            intermediarySiftCode: "",
            bankAddress: "",
            intermediaryAccountNumber: "",
            iban: ""
        }
    ]);




    const businessTypes = [
        { id: 1, label: "Manufacturing" },
        { id: 2, label: "Supply of Service" },
        { id: 3, label: "Supply of Goods" }
    ];

    const [officeAddress, setOfficeAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        landmark: "",
        googleMap: ""
    });

    const [shippingAddress, setShippingAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        landmark: "",
        googleMap: ""
    });


    console.log("[officeAddress", officeAddress, "shippingAddress", shippingAddress)

    const [initialFormData, setInitialFormData] = useState(null);
    const [initialContacts, setInitialContacts] = useState(null);
    const [initialBankDetailsList, setInitialBankDetailsList] = useState(null);
    const [initialOfficeAddress, setInitialOfficeAddress] = useState(null);
    const [initialShippingAddress, setInitialShippingAddress] = useState(null);
    const [isChanged, setIsChanged] = useState('')








    const handleInputChange = (field, value) => {

        if (field === "contactNumber" && !/^\d*$/.test(value)) return;
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() ? "" : prevErrors[field],
        }));


    };





    const tabs = [
        { id: 1, label: "Basic Information" },
        { id: 2, label: "Address Information" },
        { id: 3, label: "Bank Detail" },

    ];





    const handleNatureOfBusinessChange = (value, isChecked) => {
        if (isChecked) {
            setNatureOfBusiness((prev) => [...prev, value]);
        } else {
            setNatureOfBusiness((prev) => prev.filter((item) => item !== value));
        }

        setErrors(prevErrors => ({ ...prevErrors, natureOfBusiness: "" }));
    };

    const handleTabClick = (id) => {
        if (id === 2 || id === 3) {
            const { tempErrors, contactErrors, isValid: isFormValid } = validateForm(formData, contacts, natureOfBusiness);



            const finalErrors = {
                ...tempErrors,
                ...contactErrors,
            };

            setErrors(finalErrors);

            if (isFormValid) {
                setValue(id);
            } else {
                console.log("Validation failed. Fix the errors to proceed.");
            }
        } else {
            setValue(id);
        }
    };




    // const validateAddress = () => {
    //     let isValid = true;
    //     let errors = {};

    //     if (!officeAddress.address1?.trim()) {
    //         errors.address1 = "Address Line 1 is required";
    //         isValid = false;
    //     }

    //     if (!officeAddress.city?.trim()) {
    //         errors.city = "City is required";
    //         isValid = false;
    //     }

    //     if (!officeAddress.postalCode?.trim()) {
    //         errors.postalCode = "Postal Code is required";
    //         isValid = false;
    //     }

    //     if (!shippingAddress.address1?.trim()) {
    //         errors.shipaddress1 = "Address Line 1 is required";
    //         isValid = false;
    //     }

    //     if (!shippingAddress.city?.trim()) {
    //         errors.shipcity = "City is required";
    //         isValid = false;
    //     }

    //     if (!shippingAddress.postalCode?.trim()) {
    //         errors.shippostalCode = "Postal Code is required";
    //         isValid = false;
    //     }

    //     return { addressErrors: errors, isValid };
    // };







    const handleNextForAddress = () => {
        setIsChanged('')
        const { tempErrors, contactErrors, isValid } = validateForm(formData, contacts, natureOfBusiness);
        setErrors({ ...tempErrors, contactErrors });

        if (isValid) {
            setValue(2)
        }
    }

    const handleBackToBasicInformation = () => {
        setValue(1)
    }

    const handleNextForBank = () => {
        setIsChanged('')
        let isValid = true;
        let errors = {};

        if (!officeAddress.address1?.trim()) {
            errors.address1 = "Address Line 1 is required";
            isValid = false
        }


        if (!officeAddress.city?.trim()) {
            errors.city = "City is required";
            isValid = false
        }


        if (!officeAddress.postalCode?.trim()) {
            errors.postalCode = "Postal Code is required";
            isValid = false
        }

        if (!shippingAddress.address1?.trim()) {
            errors.shipaddress1 = "Address Line 1 is required";
            isValid = false
        }

        if (!shippingAddress.city?.trim()) {
            errors.shipcity = "City is required";
            isValid = false
        }


        if (!shippingAddress.postalCode?.trim()) {
            errors.shippostalCode = "Postal Code is required";
            isValid = false
        }

        setErrors(errors)
        if (isValid) {
            setValue(3)
        }

    }

    const handleBackToAddress = () => {
        setValue(2)
    }


    const handleAddAdditionalContact = () => {
        setContacts([
            ...contacts,
            { surName: "", name: "", countryCode: "", number: "", email: "", designation: "" },
        ]);
    };

    const handleChange = (index, field, value) => {

        if (field === "number" && !/^\d*$/.test(value)) return;

        setContacts((prev) => {
            const updatedContacts = [...prev];
            updatedContacts[index][field] = value;
            return updatedContacts;
        });

        setErrors((prevErrors) => {

            const updatedErrors = Array.isArray(prevErrors.contactErrors) ? [...prevErrors.contactErrors] : [];

            if (!updatedErrors[index]) {
                updatedErrors[index] = {};
            }


            updatedErrors[index][field] = value?.trim() === "" ? "This field is required" : "";

            return { ...prevErrors, contactErrors: updatedErrors };
        });
    };



    const handleOfficeChange = (field, value) => {

        if (field === "postalCode" && !/^\d*$/.test(value)) return;

        setOfficeAddress((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() ? "" : prevErrors[field],
        }));

    };


    const handleShippingChange = (field, value) => {

        if (field === "postalCode" && !/^\d*$/.test(value)) return;


        setShippingAddress((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [`ship${field}`]: value.trim() ? "" : prevErrors[`ship${field}`],
        }));
    };

    const handleSameAsOffice = (e) => {
        if (e.target.checked) {
            setShippingAddress(prev => ({
                ...prev,
                ...officeAddress,
            }));
            setErrors({})
        } else {
            setShippingAddress({
                address1: "",
                address2: "",
                address3: "",
                address4: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                landmark: "",
                googleMap: ""
            });
        }
    };








    const handleBankingChange = (index, field, value) => {

        const updatedList = [...bankDetailsList];
        updatedList[index][field] = value;
        setBankDetailsList(updatedList);

        const updatedErrors = { ...errors };


        if (updatedErrors.bankErrors && updatedErrors.bankErrors[index] && updatedErrors.bankErrors[index][field]) {
            delete updatedErrors.bankErrors[index][field];

            if (Object.keys(updatedErrors.bankErrors[index]).length === 0) {
                delete updatedErrors.bankErrors[index];
            }
        }
        setErrors(updatedErrors);
    };



    // const addBankDetail = () => {
    //     setBankDetailsList([
    //         ...bankDetailsList,
    //         {
    //             beneficiaryCurrency: "",
    //             accountNumber: "",
    //             bankName: "",
    //             ifscCode: "",
    //             swiftCode: "",
    //             bankAddress1: "",
    //             bankAddress2: "",
    //             bankCountry: "",
    //             intermediaryRoutingBank: "",
    //             intermediarySiftCode: "",
    //             bankAddress: "",
    //             intermediaryAccountNumber: "",
    //             iban: ""
    //         }
    //     ]);
    // };






    const validateForm = (formData, contacts, natureOfBusiness) => {
        let tempErrors = {};
        // let contactErrors = contacts.map(() => ({ name: "", number: "", email: "", designation: "" }));
        let isValid = true;


        if (!formData.businessName?.trim()) {
            tempErrors.businessName = "Business Name is required";
            isValid = false;
        }
        if (!formData.surName?.trim()) {
            tempErrors.surName = "Sur Name is required";
            isValid = false;
        }

        if (!formData.contactPerson?.trim()) {
            tempErrors.contactPerson = "Contact Person is required";
            isValid = false;
        }
        if (!formData.emailId?.trim()) {
            tempErrors.emailId = "Email ID is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            tempErrors.emailId = "Invalid Email format";
            isValid = false;
        }

        if (!formData.countryCode?.trim()) {
            tempErrors.countryCode = "CountryCode is required";
            isValid = false;
        }



        if (!formData.contactNumber?.trim()) {
            tempErrors.contactNumber = "Contact Number is required";
            isValid = false;
        } else if (formData.contactNumber.length !== 10) {
            tempErrors.contactNumber = "Contact Number must be 10 digits";
            isValid = false;
        } else if (!/^[0-9]*$/.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be Numbers";
            isValid = false;
        }
        if (!formData.designation?.trim()) {
            tempErrors.designation = "Designation is required";
            isValid = false;
        }
        if (!formData.gstVat?.trim()) {
            tempErrors.gstVat = "GST/VAT is required";
            isValid = false;
        }

        if (!formData.pan?.trim()) {
            tempErrors.pan = "PAN is required";
            isValid = false;
        }

        if (!formData.legalStatus?.trim()) {
            tempErrors.legalStatus = "Legal Status is required";
            isValid = false;
        }

        if (!natureOfBusiness || natureOfBusiness.length === 0) {
            tempErrors.natureOfBusiness = "Nature of Business is required";
            isValid = false;
        }


        // contacts.forEach((contact, index) => {
        //     if (!contact.name.trim()) {
        //         contactErrors[index].name = "Contact Name is required";
        //         isValid = false;
        //     }
        //     if (!contact.number.trim()) {
        //         contactErrors[index].number = "Contact Number is required";
        //         isValid = false;
        //     } else if (contact.number.length !== 10) {
        //         contactErrors[index].number = "Contact Number must be 10 digits";
        //         isValid = false;
        //     } else if (!/^[0-9]*$/.test(contact.number)) {
        //         contactErrors[index].number = "Contact Number must be Numbers";
        //         isValid = false;
        //     }
        //     if (!contact.email) {
        //         contactErrors[index].email = "Contact Email is required";
        //         isValid = false;
        //     } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
        //         contactErrors[index].email = "Invalid Email format";
        //         isValid = false;
        //     }
        //     if (!contact.designation.trim()) {
        //         contactErrors[index].designation = "Contact Designation is required";
        //         isValid = false;
        //     }
        // });

        return { tempErrors, isValid };
    };


    // basic Save & exit

    const handleSaveAndExit = () => {

        const { tempErrors, isValid } = validateForm(formData, contacts, natureOfBusiness);
        setIsChanged('')

        setErrors({ ...tempErrors, });

        if (isValid) {

            const AddPayload = {
                businessName: formData.businessName,
                surName: formData.surName,
                contactPerson: formData.contactPerson,
                countryCode: formData.countryCode,
                contactNumber: formData.contactNumber,
                emailId: formData.emailId,
                designation: formData.designation,
                gstVat: formData.gstVat,
                CIN: formData.cin,
                PAN: formData.pan,
                TAN: formData.tan,
                statusOfFirm: formData.legalStatus,
                natureOfBusiness: natureOfBusiness,
                additionalContactInfo: contacts.map(contact => ({
                    name: contact.name,
                    contactNumber: contact.number,
                    contactEmail: contact.email,
                    designation: contact.designation
                })),


            }

            const EditPayload = {
                clientId: editCustomerDetails?.clientId || "",
                businessName: formData.businessName,
                contactPerson: `${formData.surName}${formData.contactPerson}`.trim(),
                contactNumber: `${formData.countryCode}${formData.contactNumber}`,
                emailId: formData.emailId,
                designation: formData.designation,
                gstVat: formData.gstVat,
                CIN: formData.cin,
                PAN: formData.pan,
                TAN: formData.tan,
                statusOfFirm: formData.legalStatus,
                natureOfBusiness: natureOfBusiness,
                additionalContactInfo: contacts.map(contact => ({
                    name: contact.name,
                    contactNumber: contact.number,
                    contactEmail: contact.email,
                    designation: contact.designation
                })),


            }


            if (editCustomerDetails) {

                if (!isChangedCheck()) {
                    setIsChanged('No changes detected')
                    return;
                }
                setLoading(true)
                dispatch({ type: EDIT_CUSTOMER_SAGA, payload: EditPayload })

            } else {
                setLoading(true)
                dispatch({ type: ADD_CUSTOMER_SAGA, payload: AddPayload })

            }

        }
    };


    //  3 taps payload send here (next button)
    const handleCustomerSubmit = () => {
        let isValid = true;
        let finalErrors = {};
        let addressErrors = {};
        let bankErrors = {};
        let contactErrors = {};
        setIsChanged('')


        let tempErrors = {};

        if (!formData.businessName?.trim()) {
            tempErrors.businessName = "Business Name is required";
            isValid = false;
        }

        if (!formData.surName.trim()) {
            tempErrors.surName = "Sur Name is required";
            isValid = false;
        }


        if (!formData.contactPerson?.trim()) {
            tempErrors.contactPerson = "Contact Person is required";
            isValid = false;
        }
        if (!formData.emailId?.trim()) {
            tempErrors.emailId = "Email ID is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            tempErrors.emailId = "Invalid Email format";
            isValid = false;
        }

        if (!formData.countryCode.trim()) {
            tempErrors.countryCode = "CountryCode is required";
            isValid = false;
        }

        if (!formData.contactNumber?.trim()) {
            tempErrors.contactNumber = "Contact Number is required";
            isValid = false;
        } else if (formData.contactNumber.length !== 10 || !/^[0-9]*$/.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be 10 digits and contain only numbers";
            isValid = false;
        }
        if (!formData.designation?.trim()) tempErrors.designation = "Designation is required";
        if (!formData.gstVat?.trim()) tempErrors.gstVat = "GST/VAT is required";
        if (!formData.pan?.trim()) tempErrors.pan = "PAN is required";
        if (!formData.legalStatus?.trim()) tempErrors.legalStatus = "Legal Status is required";


        contacts?.forEach((contact, index) => {
            let contactError = {};
            if (!contact.name?.trim()) contactError.name = "Contact Name is required";
            if (!contact.number?.trim()) {
                contactError.number = "Contact Number is required";
            } else if (contact.number.length !== 10 || !/^[0-9]*$/.test(contact.number)) {
                contactError.number = "Contact Number must be 10 digits and contain only numbers";
            }
            if (!contact.email?.trim()) {
                contactError.email = "Contact Email is required";
            } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
                contactError.email = "Invalid Email format";
            }
            if (!contact.designation?.trim()) contactError.designation = "Contact Designation is required";

            if (Object.keys(contactError).length > 0) {
                contactErrors[index] = contactError;
                isValid = false;
            }
        });


        if (!officeAddress.address1?.trim()) addressErrors.address1 = "Address Line 1 is required";
        if (!officeAddress.city?.trim()) addressErrors.city = "City is required";
        if (!officeAddress.postalCode?.trim()) addressErrors.postalCode = "Postal Code is required";
        if (!shippingAddress.address1?.trim()) addressErrors.shipaddress1 = "Shipping Address Line 1 is required";
        if (!shippingAddress.city?.trim()) addressErrors.shipcity = "Shipping City is required";
        if (!shippingAddress.postalCode?.trim()) addressErrors.shippostalCode = "Shipping Postal Code is required";


        bankDetailsList.forEach((bank, index) => {
            let bankError = {};
            if (!bank.beneficiaryCurrency?.trim()) bankError.beneficiaryCurrency = "Currency is required";
            if (!bank.beneficiaryName?.trim()) bankError.beneficiaryName = "Name is required";
            if (!bank.accountNumber?.trim()) bankError.accountNumber = "Account Number is required";
            if (!bank.bankName?.trim()) bankError.bankName = "Bank Name is required";
            if (!bank.ifscCode?.trim()) bankError.ifscCode = "IFSC Code is required";
            // if (!bank.swiftCode?.trim()) bankError.swiftCode = "SWIFT Code is required";
            if (!bank.bankAddress1?.trim()) bankError.bankAddress1 = "Bank Address1 is required"
            if (Object.keys(bankError).length > 0) {
                bankErrors[index] = bankError;
                isValid = false;
            }
        })

        finalErrors = { ...tempErrors, contactErrors, ...addressErrors, bankErrors };

        if (
            Object.keys(finalErrors).length > 0 &&
            (Object.keys(contactErrors).length > 0 || Object.keys(bankErrors).length > 0)
        ) {
            setErrors(finalErrors);
            return;
        }


        if (isValid) {
            const AddPayload = {

                businessName: formData.businessName,
                contactPerson: `${formData.surName}${formData.contactPerson}`.trim(),
                contactNumber: `${formData.countryCode}${formData.contactNumber}`,
                emailId: formData.emailId,
                designation: formData.designation,
                gstVat: formData.gstVat,
                CIN: formData.cin,
                PAN: formData.pan,
                TAN: formData.tan,
                statusOfFirm: formData.legalStatus,
                natureOfBusiness: natureOfBusiness,
                additionalContactInfo: contacts.map(contact => ({
                    name: contact.name,
                    contactNumber: contact.number,
                    contactEmail: contact.email,
                    designation: contact.designation,
                })),
                address: [
                    {
                        doorNo: officeAddress.address1 || "",
                        street: officeAddress.address2 || "",
                        locality: officeAddress.address3 || "",
                        address4: officeAddress.address4 || "",
                        state: officeAddress.state,
                        country: officeAddress.country,
                        city: officeAddress.city,
                        postalCode: officeAddress.postalCode,
                        landMark: officeAddress.landmark || "",
                        mapLink: officeAddress.googleMap || "",
                        addressType: 1,
                    },
                    {
                        doorNo: shippingAddress.address1 || "",
                        street: shippingAddress.address2 || "",
                        locality: shippingAddress.address3 || "",
                        city: shippingAddress.city,
                        address4: shippingAddress.address4 || "",
                        state: shippingAddress.state,
                        country: shippingAddress.country,
                        postalCode: shippingAddress.postalCode,
                        landMark: shippingAddress.landmark || "",
                        mapLink: shippingAddress.googleMap || "",
                        addressType: 2,
                    },
                ],



                bankDetails: bankDetailsList.map(bank => ({
                    name: bank.beneficiaryName,
                    currency: bank.beneficiaryCurrency,
                    accountNo: bank.accountNumber,
                    bankName: bank.bankName,
                    ifscCode: bank.ifscCode,
                    address1: bank.bankAddress1,
                    address2: bank.bankAddress2 || "",
                    address3: bank.bankAddress || "",
                    country: bank.bankCountry || "",
                    routingBank: bank.intermediaryRoutingBank || "",
                    swiftCode: bank.swiftCode || "",
                    routingAccountIndusand: bank.intermediaryAccountNumber || "",
                    iban: bank.iban || "",
                    intermediary_swift_code: bank.intermediarySiftCode
                }))

            };

            const EditPayload = {
                clientId: editCustomerDetails?.clientId || "",
                businessName: formData.businessName,
                contactPerson: `${formData.surName}${formData.contactPerson}`.trim(),
                contactNumber: `${formData.countryCode}${formData.contactNumber}`,
                emailId: formData.emailId,
                designation: formData.designation,
                gstVat: formData.gstVat,
                CIN: formData.cin,
                PAN: formData.pan,
                TAN: formData.tan,
                statusOfFirm: formData.legalStatus,
                natureOfBusiness: natureOfBusiness,
                additionalContactInfo: contacts.map(contact => ({
                    name: contact.name,
                    contactNumber: contact.number,
                    contactEmail: contact.email,
                    designation: contact.designation,
                })),
                address: [
                    {
                        doorNo: officeAddress.address1 || "",
                        street: officeAddress.address2 || "",
                        locality: officeAddress.address3 || "",
                        address4: officeAddress.address4 || "",
                        state: officeAddress.state,
                        country: officeAddress.country,
                        city: officeAddress.city,
                        postalCode: officeAddress.postalCode,
                        landMark: officeAddress.landmark || "",
                        mapLink: officeAddress.googleMap || "",
                        addressType: 1,
                    },
                    {
                        doorNo: shippingAddress.address1 || "",
                        street: shippingAddress.address2 || "",
                        locality: shippingAddress.address3 || "",
                        city: shippingAddress.city,
                        address4: shippingAddress.address4 || "",
                        state: shippingAddress.state,
                        country: shippingAddress.country,
                        postalCode: shippingAddress.postalCode,
                        landMark: shippingAddress.landmark || "",
                        mapLink: shippingAddress.googleMap || "",
                        addressType: 2,
                    },
                ],
                bankDetails: bankDetailsList.map(bank => ({
                    name: bank.beneficiaryName,
                    currency: bank.beneficiaryCurrency,
                    accountNo: bank.accountNumber,
                    bankName: bank.bankName,
                    ifscCode: bank.ifscCode,
                    address1: bank.bankAddress1,
                    address2: bank.bankAddress2 || "",
                    address3: bank.bankAddress || "",
                    country: bank.bankCountry || "",
                    routingBank: bank.intermediaryRoutingBank || "",
                    swiftCode: bank.swiftCode || "",
                    routingAccountIndusand: bank.intermediaryAccountNumber || "",
                    iban: bank.iban || "",
                    intermediary_swift_code: bank.intermediarySiftCode
                }))

            };

            if (editCustomerDetails) {
                // if (!isChangedCheck()) {

                //     setIsChanged('No changes detected')
                //     return;
                // }

                dispatch({ type: EDIT_CUSTOMER_SAGA, payload: EditPayload })
                setLoading(true)

            } else {
                dispatch({ type: ADD_CUSTOMER_SAGA, payload: AddPayload });
                setLoading(true)
            }


        }
    };


    //  edit scenario enable address tab button for save & exit payload
    const handleCustomerEditAddress = () => {
        let isValid = true;
        let finalErrors = {};
        let addressErrors = {};
        let bankErrors = {};
        let contactErrors = {};
        setIsChanged('')

        let tempErrors = {};

        if (!formData.businessName?.trim()) {
            tempErrors.businessName = "Business Name is required";
            isValid = false;
        }

        if (!formData.surName?.trim()) {
            tempErrors.surName = "Sur Name is required";
            isValid = false;
        }

        if (!formData.contactPerson?.trim()) {
            tempErrors.contactPerson = "Contact Person is required";
            isValid = false;
        }
        if (!formData.emailId?.trim()) {
            tempErrors.emailId = "Email ID is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            tempErrors.emailId = "Invalid Email format";
            isValid = false;
        }
        if (!formData.countryCode?.trim()) {
            tempErrors.countryCode = "CountryCode is required";
            isValid = false;
        }
        if (!formData.contactNumber?.trim()) {
            tempErrors.contactNumber = "Contact Number is required";
            isValid = false;
        } else if (formData.contactNumber.length !== 10 || !/^[0-9]*$/.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be 10 digits and contain only numbers";
            isValid = false;
        }
        if (!formData.designation?.trim()) tempErrors.designation = "Designation is required";
        if (!formData.gstVat?.trim()) tempErrors.gstVat = "GST/VAT is required";
        if (!formData.pan?.trim()) tempErrors.pan = "PAN is required";
        if (!formData.legalStatus?.trim()) tempErrors.legalStatus = "Legal Status is required";


        contacts?.forEach((contact, index) => {
            let contactError = {};
            if (!contact.name?.trim()) contactError.name = "Contact Name is required";
            if (!contact.number?.trim()) {
                contactError.number = "Contact Number is required";
            } else if (contact.number.length !== 10 || !/^[0-9]*$/.test(contact.number)) {
                contactError.number = "Contact Number must be 10 digits and contain only numbers";
            }
            if (!contact.email?.trim()) {
                contactError.email = "Contact Email is required";
            } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
                contactError.email = "Invalid Email format";
            }
            if (!contact.designation?.trim()) contactError.designation = "Contact Designation is required";

            if (Object.keys(contactError).length > 0) {
                contactErrors[index] = contactError;
                isValid = false;
            }
        });


        if (!officeAddress.address1?.trim()) addressErrors.address1 = "Address Line 1 is required";
        if (!officeAddress.city?.trim()) addressErrors.city = "City is required";
        if (!officeAddress.postalCode?.trim()) addressErrors.postalCode = "Postal Code is required";
        if (!shippingAddress.address1?.trim()) addressErrors.shipaddress1 = "Shipping Address Line 1 is required";
        if (!shippingAddress.city?.trim()) addressErrors.shipcity = "Shipping City is required";
        if (!shippingAddress.postalCode?.trim()) addressErrors.shippostalCode = "Shipping Postal Code is required";


        bankDetailsList.forEach((bank, index) => {
            let bankError = {};
            if (!bank.beneficiaryCurrency?.trim()) bankError.beneficiaryCurrency = "Currency is required";
            if (!bank.beneficiaryName?.trim()) bankError.beneficiaryName = "Name is required";
            if (!bank.accountNumber?.trim()) bankError.accountNumber = "Account Number is required";
            if (!bank.bankName?.trim()) bankError.bankName = "Bank Name is required";
            if (!bank.ifscCode?.trim()) bankError.ifscCode = "IFSC Code is required";
            // if (!bank.swiftCode?.trim()) bankError.swiftCode = "SWIFT Code is required";
            if (!bank.bankAddress1?.trim()) bankError.bankAddress1 = "Bank Address1 is required"
            if (Object.keys(bankError).length > 0) {
                bankErrors[index] = bankError;
                isValid = false;
            }
        })

        finalErrors = { ...tempErrors, contactErrors, ...addressErrors, bankErrors };

        if (
            Object.keys(finalErrors).length > 0 &&
            (Object.keys(contactErrors).length > 0 || Object.keys(bankErrors).length > 0)
        ) {
            setErrors(finalErrors);
            return;
        }


        if (isValid) {

            const EditPayload = {
                clientId: editCustomerDetails?.clientId || "",
                businessName: formData.businessName,
                contactPerson: `${formData.surName}${formData.contactPerson}`.trim(),
                contactNumber: `${formData.countryCode}${formData.contactNumber}`,
                emailId: formData.emailId,
                designation: formData.designation,
                gstVat: formData.gstVat,
                CIN: formData.cin,
                PAN: formData.pan,
                TAN: formData.tan,
                statusOfFirm: formData.legalStatus,
                natureOfBusiness: natureOfBusiness,
                additionalContactInfo: contacts.map(contact => ({
                    name: contact.name,
                    contactNumber: contact.number,
                    contactEmail: contact.email,
                    designation: contact.designation,
                })),
                address: [
                    {
                        doorNo: officeAddress.address1 || "",
                        street: officeAddress.address2 || "",
                        locality: officeAddress.address3 || "",
                        city: officeAddress.city,
                        address4: officeAddress.address4 || "",
                        state: officeAddress.state,
                        country: officeAddress.country,
                        postalCode: officeAddress.postalCode,
                        landMark: officeAddress.landmark || "",
                        mapLink: officeAddress.googleMap || "",
                        addressType: 1,
                    },
                    {
                        doorNo: shippingAddress.address1 || "",
                        street: shippingAddress.address2 || "",
                        locality: shippingAddress.address3 || "",
                        city: shippingAddress.city,
                        address4: shippingAddress.address4 || "",
                        state: shippingAddress.state,
                        country: shippingAddress.country,
                        postalCode: shippingAddress.postalCode,
                        landMark: shippingAddress.landmark || "",
                        mapLink: shippingAddress.googleMap || "",
                        addressType: 2,
                    },
                ],
                bankDetails: bankDetailsList.map(bank => ({
                    name: bank.beneficiaryName,
                    currency: bank.beneficiaryCurrency,
                    accountNo: bank.accountNumber,
                    bankName: bank.bankName,
                    ifscCode: bank.ifscCode,
                    address1: bank.bankAddress1,
                    address2: bank.bankAddress2 || "",
                    address3: bank.bankAddress || "",
                    country: bank.bankCountry || "",
                    routingBank: bank.intermediaryRoutingBank || "",
                    swiftCode: bank.swiftCode || "",
                    routingAccountIndusand: bank.intermediaryAccountNumber || "",
                    iban: bank.iban || "",
                    intermediary_swift_code: bank.intermediarySiftCode
                }))

            };

            if (editCustomerDetails) {
                if (!isChangedCheck()) {
                    setIsChanged('No changes detected')
                    return;
                }

                dispatch({ type: EDIT_CUSTOMER_SAGA, payload: EditPayload })
                setLoading(true)

            }


        }
    };


    useEffect(() => {
        if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 5000)
        }
    }, [state.Common?.successCode, state.Common?.code]);



    useEffect(() => {
        if (state.Common.IsVisible === 1) {
            navigate('/client')
        }

    }, [state.Common.IsVisible])

    useEffect(() => {
        dispatch({ type: GET_MASTER_SAGA })
    }, [])

    useEffect(() => {
        if (editCustomerDetails) {
            const newFormData = {
                businessName: editCustomerDetails.businessName || '',
                contactPerson: editCustomerDetails.contactPerson || '',
                contactNumber: editCustomerDetails.contactNumber || '',
                emailId: editCustomerDetails.emailId || '',
                designation: editCustomerDetails.designation || '',
                gstVat: editCustomerDetails.gstVat || '',
                cin: editCustomerDetails.CIN || '',
                pan: editCustomerDetails.PAN || '',
                tan: editCustomerDetails.TAN || '',
                legalStatus: editCustomerDetails.statusOfFirm || '',

            };

            const natureOfBusinessValue = editCustomerDetails.natureOfBusiness
                ? Number(editCustomerDetails.natureOfBusiness)
                : null;



            setNatureOfBusiness(natureOfBusinessValue);

            const newContacts = (editCustomerDetails.additionalContactInfo || []).map((item) => ({
                name: item.name || '',
                number: item.contactNumber || '',
                email: item.contactEmail || '',
                designation: item.designation || '',
            }));

            const newBankDetailsList = editCustomerDetails.bankDetails?.map(item => ({
                beneficiaryCurrency: item.currency || "",
                beneficiaryName: item.name,
                accountNumber: item.accountNo || "",
                bankName: item.bankName || "",
                ifscCode: item.ifscCode || "",
                swiftCode: item.swiftCode || "",
                bankAddress1: item.address1 || "",
                bankAddress2: item.address2 || "",
                bankCountry: item.country || "",
                intermediaryRoutingBank: item.routingAccountIndusand || "",
                intermediarySiftCode: item.routingSiftCode || "",
                intermediaryAccountNumber: item.routingBank || "",
                iban: item.iban || "",
            })) || [];

            const officeAddressData = editCustomerDetails.address?.find(addr => addr.addressType === "Office Address") || {};
            const newOfficeAddress = {
                address1: officeAddressData.doorNo || '',
                address2: officeAddressData.street || '',
                address3: officeAddressData.locality || '',
                // address4: officeAddressData.landMark || '',
                city: officeAddressData.city || '',
                postalCode: officeAddressData.postalCode || '',
                landmark: officeAddressData.landMark || '',
                googleMap: officeAddressData.mapLink || ''
            };

            const shippingAddressData = editCustomerDetails.address?.find(addr => addr.addressType === "Shipping Address") || {};
            const newShippingAddress = {
                address1: shippingAddressData.doorNo || '',
                address2: shippingAddressData.street || '',
                address3: shippingAddressData.locality || '',
                // address4: shippingAddressData.landMark || '',
                city: shippingAddressData.city || '',
                postalCode: shippingAddressData.postalCode || '',
                landmark: shippingAddressData.landMark || '',
                googleMap: shippingAddressData.mapLink || ''
            };

            setFormData(newFormData);
            setNatureOfBusiness(editCustomerDetails.natureOfBusiness || '');
            setContacts(newContacts);
            setBankDetailsList(newBankDetailsList);
            setOfficeAddress(newOfficeAddress);
            setShippingAddress(newShippingAddress);


            setInitialFormData(newFormData);
            setInitialContacts(newContacts);
            setInitialBankDetailsList(newBankDetailsList);
            setInitialOfficeAddress(newOfficeAddress);
            setInitialShippingAddress(newShippingAddress);
        }
    }, [editCustomerDetails]);

    const isChangedCheck = () => {
        return (
            JSON.stringify(formData) !== JSON.stringify(initialFormData) ||
            JSON.stringify(contacts) !== JSON.stringify(initialContacts) ||
            JSON.stringify(bankDetailsList) !== JSON.stringify(initialBankDetailsList) ||
            JSON.stringify(officeAddress) !== JSON.stringify(initialOfficeAddress) ||
            JSON.stringify(shippingAddress) !== JSON.stringify(initialShippingAddress)
        );

    };

    useEffect(() => {
        if (formData?.contactPerson && !editCustomerDetails) {
            setBankDetailsList((prev) => {
                const updated = [...prev];
                updated[0].beneficiaryName = formData.contactPerson;
                return updated;
            });
        }
    }, [formData?.contactPerson]);












    return (
        <div className='bg-slate-100 flex flex-1 flex-col ps-5 pt-3 pe-5'>

            <div className='bg-white rounded-2xl ps-5 pt-3 pe-5 relative'>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}



                <div className='flex items-center justify-between pe-12 mb-4'>
                    <h2 className="text-xl font-semibold mb-2  font-Gilroy">{editCustomerDetails ? 'Edit Customer' : "Add Customer"} </h2>
                </div>
                {
                    isChanged && <label className='mb-4 text-start font-Gilroy font-normal text-md text-red-600'>{isChanged}</label>
                }
                <div className="flex flex-col sm:flex-row gap-2 mb-4  border-gray-300">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 font-Gilroy ${value === tab.id
                                ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                                : "text-gray-500 border-neutral-100 border-b-4 text-base"
                                } transition-all duration-600`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {
                    state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage} </label>
                }

                {
                    state.Common.errorMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {state.Common.errorMessage} </label>
                }
                {value === 1 &&
                    <div className='bg-white rounded-2xl h-auto ps-5 pt-3 pe-5'>


                        <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">Basic Information</h2>

                        <div className='max-h-[320px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                <div className=''>
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Business Name  <span className='text-red-500'>*</span></label>
                                    <input

                                        type='text'
                                        value={formData.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        placeholder='Enter Business Name'
                                        className='px-3 py-3 border w-full rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.businessName && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.businessName}
                                            </span>
                                        </div>
                                    )}

                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact Person   <span className='text-red-500'>*</span></label>


                                    <div className="flex">
                                        <select
                                            value={formData.surName}
                                            onChange={(e) => handleInputChange('surName', e.target.value)}
                                            className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 w-[100px]"
                                        >
                                            <option value="" >Select</option>
                                            {state?.settings?.titles.map((title) => (
                                                <option key={title.id} value={title.name}>
                                                    {title.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input

                                            type='text'
                                            value={formData.contactPerson}
                                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                            placeholder='Enter Contact Person'
                                            className='px-3 py-3 border w-full border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>

                                    {errors.surName && errors.contactPerson ? (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                Sur Name & Contact Name is required
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {errors.surName && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <InfoCircle size={16} color="#DC2626" />
                                                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                        {errors.surName}
                                                    </span>
                                                </div>
                                            )}
                                            {errors.contactPerson && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <InfoCircle size={16} color="#DC2626" />
                                                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                        {errors.contactPerson}
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}


                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact  Number <span className='text-red-500'>*</span></label>


                                    <div className="flex">
                                        <select
                                            value={formData.countryCode}
                                            onChange={(e) => handleInputChange('countryCode', e.target.value)}
                                            className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 w-[100px]"
                                        >
                                            <option value="">Select</option>
                                            {state.settings?.countryCode?.map((item) => (
                                                <option key={item.id} value={item.phone}>
                                                    {item.phone || 91}
                                                </option>
                                            ))}

                                        </select>

                                        <input

                                            type='text'
                                            value={formData.contactNumber}
                                            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                                            placeholder='Enter Contact  Number'
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className='w-full px-3 py-3 border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />

                                    </div>
                                    {errors.countryCode && errors.contactNumber ? (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                Country Code & Contact Number is required
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {errors.countryCode && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <InfoCircle size={16} color="#DC2626" />
                                                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                        {errors.countryCode}
                                                    </span>
                                                </div>
                                            )}
                                            {errors.contactNumber && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <InfoCircle size={16} color="#DC2626" />
                                                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                        {errors.contactNumber}
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}


                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Email ID  <span className='text-red-500'>*</span></label>
                                    <input
                                        type='text'
                                        value={formData.emailId}
                                        onChange={(e) => handleInputChange('emailId', e.target.value)}
                                        placeholder='Enter Email ID'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.emailId && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.emailId}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Designation  <span className='text-red-500'>*</span></label>
                                    <input

                                        type='text'
                                        value={formData.designation}
                                        onChange={(e) => handleInputChange('designation', e.target.value)}
                                        placeholder='Enter Designation'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.designation && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.designation}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>GST/VAT <span className='text-red-500'>*</span></label>
                                    <input

                                        type='text'
                                        value={formData.gstVat}
                                        onChange={(e) => handleInputChange('gstVat', e.target.value)}
                                        placeholder='Enter GST/VAT'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.gstVat && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.gstVat}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800' >CIN </label>
                                    <input

                                        type='text'
                                        value={formData.cin}
                                        onChange={(e) => handleInputChange('cin', e.target.value)}
                                        placeholder='Enter CIN'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.cin && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.cin}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>PAN  <span className='text-red-500'>*</span></label>
                                    <input

                                        type='text'
                                        value={formData.pan}
                                        onChange={(e) => handleInputChange('pan', e.target.value)}
                                        placeholder='Enter PAN'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.pan && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.pan}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>TAN </label>
                                    <input

                                        type='text'
                                        value={formData.tan}
                                        onChange={(e) => handleInputChange('tan', e.target.value)}
                                        placeholder='Enter TAN'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.tan && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.tan}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2' >
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Legal Status of firm <span className='text-red-500'>*</span></label>
                                    <select
                                        value={formData.legalStatus}
                                        onChange={(e) => handleInputChange('legalStatus', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="" selected>Select Legal Status of firm</option>
                                        <option value="PRIVATE LIMITED">PRIVATE LIMITED</option>
                                        <option value="LLT_LOW LATENCY TRANSSPORT">LLT_LOW LATENCY TRANSSPORT</option>
                                        <option value="PARTNERSHIP">PARTNERSHIP</option>
                                        <option value="PROPRIETORSHIP">PROPRIETORSHIP</option>
                                    </select>

                                    {errors.legalStatus && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                                {errors.legalStatus}
                                            </span>
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className='mb-2'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                    Nature of Business <span className='text-red-500'>*</span>
                                </label>
                                <div className='flex gap-6'>
                                    {businessTypes.map((business) => (
                                        <div key={business.id} className='flex gap-3 items-center'>
                                            <input
                                                type="checkbox"
                                                className="ml-2 accent-[#205DA8]"
                                                checked={natureOfBusiness.includes(business.id)}
                                                onChange={(e) => handleNatureOfBusinessChange(business.id, e.target.checked)}
                                            />
                                            <label className='block text-start font-Gilroy font-normal text-md text-neutral-800'>
                                                {business.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.natureOfBusiness && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <InfoCircle size={16} color="#DC2626" />
                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.natureOfBusiness}</p>
                                    </div>
                                )}

                            </div>



                            <div className="p-4">
                                {contacts.map((contact, index) => (
                                    <div key={index} className="mb-6">
                                        <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black pt-3 pb-3">
                                            {`Additional Contact ${index + 1}`}
                                        </h2>

                                        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                    Contact Person Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex">
                                                    <select
                                                        value={contact.surName}
                                                        onChange={(e) => handleChange(index, 'surName', e.target.value)}
                                                        className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 w-[100px]"
                                                    >
                                                        <option value="">Select</option>
                                                        {state?.settings?.titles?.map((title) => (
                                                            <option key={title.id} value={title.name}>
                                                                {title.name}
                                                            </option>
                                                        ))}

                                                    </select>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Contact Person Name"
                                                        value={contact.name}
                                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                                        className="px-3 py-3 w-full border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                                    />
                                                </div>
                                                {errors.contactErrors?.[index]?.name && (
                                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                        <InfoCircle size={16} color="#DC2626" />
                                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].name}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                    Contact Number <span className="text-red-500">*</span>
                                                </label>

                                                <div className="flex">
                                                    <select
                                                        value={contact.countryCode}
                                                        onChange={(e) => handleChange(index, 'countryCode', e.target.value)}
                                                        className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 w-[100px]"
                                                    >
                                                        <option value="">Select</option>
                                                        {state.settings?.countryCode?.map((item) => (
                                                            <option key={item.id} value={item.phone}>
                                                                {item.phone || 91}
                                                            </option>
                                                        ))}

                                                    </select>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Contact Number"
                                                        value={contact.number}
                                                        maxLength={10}
                                                        onChange={(e) => handleChange(index, "number", e.target.value)}
                                                        className="w-full px-3 py-3 border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                                    />
                                                </div>
                                                {errors.contactErrors?.[index]?.number && (
                                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                        <InfoCircle size={16} color="#DC2626" />
                                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].number}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                    Email ID <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Email ID"
                                                    value={contact.email}
                                                    onChange={(e) => handleChange(index, "email", e.target.value)}
                                                    className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                                />
                                                {errors.contactErrors?.[index]?.email && (
                                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                        <InfoCircle size={16} color="#DC2626" />
                                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].email}</p>
                                                    </div>

                                                )}
                                            </div>

                                            <div>
                                                <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                    Designation <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Designation"
                                                    value={contact.designation}
                                                    onChange={(e) =>
                                                        handleChange(index, "designation", e.target.value)
                                                    }
                                                    className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                                />
                                                {errors.contactErrors?.[index]?.designation && (
                                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                        <InfoCircle size={16} color="#DC2626" />
                                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].designation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {contacts.length < 10 && (
                                    <label
                                        className="rounded-lg text-[#205DA8] font-semibold font-Gilroy text-md cursor-pointer pt-3 pb-3"
                                        onClick={handleAddAdditionalContact}
                                    >
                                        + Add Additional Contact {contacts.length + 1}
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mb-4 mt-2">
                            <div className='gap-3 flex '>

                                <button onClick={handleSaveAndExit} className="px-10 py-2 border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat mb-4 text-base font-semibold"  >Save & Exit</button>




                                <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleNextForAddress}>Next</button>
                            </div>
                        </div>


                    </div>
                }


                {value === 2 &&
                    <div className='bg-white rounded-2xl h-auto p-5'>


                        <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Address Information</h2>

                        <div className='max-h-[300px] overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3' >

                            <h4 className="text-base font-medium mb-4 font-Gilroy text-black">Office Address <span className='text-red-500'>*</span></h4>
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                <div className='mb-2 items-center '>
                                    <input
                                        type='text'
                                        placeholder='Enter Address Line 1'
                                        value={officeAddress.address1}
                                        onChange={(e) => handleOfficeChange('address1', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.address1 && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.address1}</span>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2  items-center'>
                                    <input
                                        z
                                        type='text'
                                        placeholder='Enter Address Line 2'
                                        value={officeAddress.address2}
                                        onChange={(e) => handleOfficeChange('address2', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <input
                                        type='text'
                                        placeholder='Enter Address Line 3'
                                        value={officeAddress.address3}
                                        onChange={(e) => handleOfficeChange('address3', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <input

                                        type='text'
                                        placeholder='Enter Address Line 4'
                                        value={officeAddress.address4}
                                        onChange={(e) => handleOfficeChange('address4', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>

                                    <input

                                        type='text'
                                        placeholder='Enter City'
                                        value={officeAddress.city}
                                        onChange={(e) => handleOfficeChange('city', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.city && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.city}</span>
                                        </div>
                                    )}
                                </div>



                                <div className='mb-2 items-center'>
                                    <select
                                        value={officeAddress.state}
                                        onChange={(e) => handleOfficeChange('state', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="">Select State</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>


                                    </select>
                                    {errors.state && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.state}</span>
                                        </div>
                                    )}
                                </div>






                            </div>
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-1'>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country</label>

                                    <select
                                        value={officeAddress.country}
                                        onChange={(e) => handleOfficeChange('country', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Italy">Italy</option>

                                    </select>
                                    {errors.country && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.country}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500 h-fit'>*</span></label>
                                    <input

                                        type='text'
                                        placeholder='Enter Postal Code'
                                        value={officeAddress.postalCode}
                                        onChange={(e) => handleOfficeChange('postalCode', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.postalCode && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.postalCode}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                    <input

                                        type='text'
                                        placeholder='Enter Landmark'
                                        value={officeAddress.landmark}
                                        onChange={(e) => handleOfficeChange('landmark', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                    <input

                                        type='text'
                                        placeholder='Enter Google Map Link'
                                        value={officeAddress.googleMap}
                                        onChange={(e) => handleOfficeChange('googleMap', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>



                            </div>


                            <h4 className="text-base font-medium mb-4 font-Gilroy text-black" >Shipping Address  <span className='text-red-500'>*</span> <span className='text-md accent-[#205DA8]'><input type="checkbox" onChange={handleSameAsOffice} /></span><span className='text-sm font-medium mb-4 font-Gilroy text-[#205DA8]'> Same as office Address</span></h4>
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>


                                <div className='mb-2 items-center '>
                                    <input

                                        type='text'
                                        placeholder='Enter Address Line 1'
                                        value={shippingAddress.address1}
                                        onChange={(e) => handleShippingChange('address1', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.shipaddress1 && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.shipaddress1}</span>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2  items-center'>
                                    <input

                                        type='text'
                                        placeholder='Enter Address Line 2'
                                        value={shippingAddress.address2}
                                        onChange={(e) => handleShippingChange('address2', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />

                                </div>
                                <div className='mb-2 items-center'>
                                    <input

                                        type='text'
                                        placeholder='Enter Address Line 3'
                                        value={shippingAddress.address3}
                                        onChange={(e) => handleShippingChange('address3', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <input

                                        type='text'
                                        placeholder='Enter Address Line 4'
                                        value={shippingAddress.address4}
                                        onChange={(e) => handleShippingChange('address4', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <input

                                        type='text'
                                        placeholder='Enter City'
                                        value={shippingAddress.city}
                                        onChange={(e) => handleShippingChange('city', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.shipcity && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.shipcity}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2 items-center'>
                                    <select
                                        value={shippingAddress.state}
                                        onChange={(e) => handleShippingChange('state', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="" >Select state</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Ladakh">Ladakh</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>

                                    </select>
                                    {errors.shipstate && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.shipstate}</span>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country</label>

                                    <select
                                        value={shippingAddress.country}
                                        onChange={(e) => handleOfficeChange('country', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Italy">Italy</option>

                                    </select>
                                    {errors.shipcountry && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy">{errors.shipcountry}</span>
                                        </div>
                                    )}
                                </div>



                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                    <input

                                        type='text'
                                        placeholder='Enter Postal Code'
                                        value={shippingAddress.postalCode}
                                        onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.shippostalCode && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <span className="text-red-500 text-xs font-Gilroy"> {errors.shippostalCode}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                    <input

                                        type='text'
                                        placeholder='Enter Landmark'
                                        value={shippingAddress.landmark}
                                        onChange={(e) => handleShippingChange('landmark', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                    <input

                                        type='text'
                                        placeholder='Enter Google Map Link'
                                        value={shippingAddress.googleMap}
                                        onChange={(e) => handleShippingChange('googleMap', e.target.value)}
                                        className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>



                            </div>

                        </div>
                        <div className="flex justify-between mb-4 mt-4">
                            <button className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleBackToBasicInformation} >Back</button>
                            <div className='gap-3 flex '>

                                {
                                    editCustomerDetails &&
                                    <button onClick={handleCustomerEditAddress} className="px-10 py-2 border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat mb-4 text-base font-semibold"  >Save & Exit</button>}

                                <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleNextForBank} >Next</button>
                            </div>
                        </div>


                    </div>
                }



                {value === 3 &&
                    <div className='bg-white rounded-2xl h-auto p-5'>

                        <h2 className="text-2xl font-semibold mb-4 font-Gilroy">Bank Detail</h2>
                        <div className='max-h-[300px] overflow-y-auto  
    lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3' >
                            {bankDetailsList.map((bankDetails, index) => (
                                <div key={index} className='mb-4  p-4 rounded-lg'>
                                    {
                                        bankDetailsList.length > 1 && <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black pt-3 pb-3">
                                            {`Bank Details ${index + 1}`}
                                        </h2>
                                    }


                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Name<span className='text-red-500'>*</span></label>
                                            <input

                                                type='text'
                                                value={bankDetails.beneficiaryName || formData?.contactPerson}
                                                onChange={(e) => handleBankingChange(index, 'beneficiaryName', e.target.value)}
                                                placeholder='Enter Beneficiary Name '
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />


                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].beneficiaryName && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].beneficiaryName}
                                                </div>
                                            )}

                                        </div>


                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Currency<span className='text-red-500'>*</span></label>


                                            <select
                                                value={bankDetails.beneficiaryCurrency}
                                                onChange={(e) => handleBankingChange(index, 'beneficiaryCurrency', e.target.value)}
                                                className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                                <option value="">Select beneficiary currency</option>
                                                <option value="USD">USD</option>
                                                <option value="INR">INR</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                                <option value="JPY">JPY</option>

                                            </select>

                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].beneficiaryCurrency && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].beneficiaryCurrency}
                                                </div>
                                            )}

                                        </div>




                                        <div className='mb-2  items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Number <span className='text-red-500'>*</span></label>

                                            <input

                                                type='text'
                                                placeholder='Enter Account Number'
                                                value={bankDetails.accountNumber}
                                                onChange={(e) => handleBankingChange(index, 'accountNumber', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].accountNumber && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].accountNumber}
                                                </div>
                                            )}

                                        </div>
                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Bank Name<span className='text-red-500'>*</span></label>

                                            <input

                                                type='text'
                                                placeholder='Enter Account Name'
                                                value={bankDetails.bankName}
                                                onChange={(e) => handleBankingChange(index, 'bankName', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].bankName && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].bankName}
                                                </div>
                                            )}

                                        </div>







                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IFSC Code<span className='text-red-500'>*</span></label>

                                            <input
                                                type='text'
                                                placeholder='Enter IFSC Code'
                                                value={bankDetails.ifscCode}
                                                onChange={(e) => handleBankingChange(index, 'ifscCode', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].ifscCode && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].ifscCode}
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code </label>
                                            <input

                                                type='text'
                                                placeholder='Enter SWIFT Code'
                                                value={bankDetails.swiftCode}
                                                onChange={(e) => handleBankingChange(index, 'swiftCode', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].swiftCode && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].swiftCode}
                                                </div>
                                            )}

                                        </div>

                                        <div className='mb-2  items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 1 <span className='text-red-500'>*</span> </label>

                                            <input

                                                type='text'
                                                placeholder='Enter Bank Address 1'
                                                value={bankDetails.bankAddress1}
                                                onChange={(e) => handleBankingChange(index, 'bankAddress1', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {errors.bankErrors && errors.bankErrors[index] && errors.bankErrors[index].bankAddress1 && (
                                                <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                    <InfoCircle size={16} color="#DC2626" /> {errors.bankErrors[index].bankAddress1}
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 2 </label>

                                            <input

                                                type='text'
                                                placeholder='Enter Bank Address 2'
                                                value={bankDetails.bankAddress2}
                                                onChange={(e) => handleBankingChange(index, 'bankAddress2', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>
                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 3</label>
                                            <input

                                                type='text'
                                                placeholder='Enter Bank Address 3'
                                                value={bankDetails.bankAddress}
                                                onChange={(e) => handleBankingChange(index, 'bankAddress', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Country </label>
                                            <select
                                                value={bankDetails.bankCountry}
                                                onChange={(e) => handleBankingChange(index, 'bankCountry', e.target.value)}
                                                className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                                <option value="">Select Bank Country</option>
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Australia">Australia</option>


                                            </select>
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Intermediary Routing Bank </label>

                                            <input
                                                type='text'
                                                placeholder='Enter Intermediary Routing Bank'
                                                value={bankDetails.intermediaryRoutingBank}
                                                onChange={(e) => handleBankingChange(index, 'intermediaryRoutingBank', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code for intermediary Bank</label>

                                            <input

                                                type='text'
                                                placeholder='Enter SWIFT Code for intermediary Bank'
                                                value={bankDetails.intermediarySiftCode}
                                                onChange={(e) => handleBankingChange(index, 'intermediarySiftCode', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>




                                    </div>


                                    <div className='grid md:grid-cols-2 sm:grid-cols-2 gap-3 mt-1'>


                                        <div className='mb-2  items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Bank Account Number with Intermediary </label>

                                            <input

                                                type='text'
                                                placeholder='Enter Beneficiary Bank Account Number with Intermediary'
                                                value={bankDetails.intermediaryAccountNumber}
                                                onChange={(e) => handleBankingChange(index, 'intermediaryAccountNumber', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>


                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IBAN (International Bank Account Number) </label>
                                            <input

                                                type='text'
                                                placeholder='Enter IBAN (International Bank Account Number)'
                                                value={bankDetails.iban}
                                                onChange={(e) => handleBankingChange(index, 'iban', e.target.value)}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                        {/* {
                        bankDetailsList.length === 1 &&
                        <label onClick={addBankDetail} className="px-3 py-2 cursor-pointer  rounded-lg text-[#205DA8] font-semibold font-Gilroy"> + Add Another Bank Detail</label>


                    } */}





                        <div className="flex justify-between mt-4 mb-4">
                            <button className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleBackToAddress} >Back</button>

                            <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleCustomerSubmit} >Submit</button>

                        </div>


                    </div>
                }
            </div>

        </div>
    )
}

export default AddCustomer