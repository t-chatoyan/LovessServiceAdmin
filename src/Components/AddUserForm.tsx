import {Input, Select, Space, Button} from 'antd'
import {EnvironmentOutlined} from '@ant-design/icons'
import {getAllCountries} from 'country-kit'
import {useEffect, useMemo, useState} from 'react'

interface AddUserFormProps {
    onCancel: () => void
    onSubmit?: () => void
}

const AddUserForm = ({onCancel, onSubmit}: AddUserFormProps) => {
    const countries = useMemo(() => getAllCountries(), [])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    
    useEffect(() => {
        console.log('Country Kit Data:', countries)
    }, [countries])

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        setPhoneNumber(value)
    }

    const handleAddressButtonClick = () => {
        window.open('https://www.google.com/maps', '_blank')
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const countryOptions = useMemo(() => {
        const seenCallingCodes = new Set<string>()
        return countries
            .filter(country => {
                if (seenCallingCodes.has(country.callingCode)) {
                    return false
                }
                seenCallingCodes.add(country.callingCode)
                return true
            })
            .map(country => ({
                label: `${country.flag} ${country.callingCode}`,
                value: country.callingCode,
            }))
    }, [countries])

    const handleSubmit = () => {
        onSubmit?.()
        onCancel()
    }

    return (
        <div className="flex flex-col gap-[16px]">
            <Input
                placeholder="Անուն"
                className="add-user-input"
                style={{
                    borderRadius: '10px',
                    padding: '15px',
                    border: '1px solid #ECECEC',
                    height: '48px',
                }}
            />
            <Space.Compact style={{width: '100%'}}>
                <Input
                    placeholder="Հասցե"
                    className="add-user-input"
                    value={address}
                    onChange={handleAddressChange}
                    style={{
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '0',
                        padding: '15px',
                        border: '1px solid #ECECEC',
                        height: '48px',
                    }}
                />
                <Button
                    onClick={handleAddressButtonClick}
                    icon={<EnvironmentOutlined style={{color: '#fff'}} />}
                    style={{
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        border: '1px solid #502E90',
                        borderLeft: 'none',
                        height: '48px',
                        width: '60px',
                        padding: '0 15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#502E90',
                    }}
                />
            </Space.Compact>
            <div className="flex flex-row gap-[16px]">
                <Select
                    placeholder="Ընտրել տիպ"
                    options={[
                        {label: 'Անհատ', value: 'individual'},
                        {label: 'Կազմակերպություն', value: 'organization'},
                    ]}
                    className="add-user-select"
                    style={{
                        flex: 1,
                        borderRadius: '10px',
                        height: '48px',
                    }}
                />
                <Space.Compact style={{flex: 1}}>
                    <Select
                        defaultValue="+374"
                        options={countryOptions}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        style={{
                            width: '120px',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            border: '1px solid #ECECEC',
                            height: '48px',
                        }}
                    />
                    <Input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Հեռախոսահամար"
                        className="add-user-input"
                        style={{
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            padding: '15px',
                            border: '1px solid #ECECEC',
                            borderLeft: 'none',
                            height: '48px',
                        }}
                    />
                </Space.Compact>
            </div>
            <div className="flex justify-end">
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                        borderRadius: '6px',
                        backgroundColor: '#502E90',
                        height: '38px',
                        padding: '9px 25px',
                        border: 'none',
                    }}
                >
                    Ավելացնել
                </Button>
            </div>
        </div>
    )
}

export default AddUserForm
