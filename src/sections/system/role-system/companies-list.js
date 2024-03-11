import { Box, List, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import { listDepartmentApi } from 'src/contexts/api/company/api-department';

const CompaniesList = ({ handleDepartmentSelect }) => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [expandedCompany, setExpandedCompany] = useState('');
    const [companiesData, setCompaniesData] = useState([]);

    const handleCompanyClick = (company) => {
        if (company === expandedCompany) {
            setExpandedCompany('');
            setSelectedCompany('');
            setSelectedDepartment('');
        } else {
            setExpandedCompany(company);
            setSelectedCompany(company);
        }
    };

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
        handleDepartmentSelect(department);
    };

    useEffect(() => {
        const fetchData = async () => {
            const companyRes = await listCompanyApi();

            if (Array.isArray(companyRes.data) && companyRes.data.length > 0) {
                const companies = companyRes.data.map((com) => ({
                    companyName: com.companyName,
                    companyId: com.companyId,
                }));

                // list department
                const departmentRes = await listDepartmentApi();
                if (Array.isArray(departmentRes.data) && departmentRes.data.length > 0) {
                    const departments = departmentRes.data.map((dep) => ({
                        value: dep.departmentId,
                        company: companies.find((com) => com.companyId === dep.companyId)?.companyName,
                        companyId: dep.companyId,
                        label: dep.deparmentName,
                    }));

                    // transform data
                    const transformedData = companies.map((company) => {
                        const companyDepartments = departments
                            .filter((dep) => dep.companyId === company.companyId)
                            .map((dep) => ({
                                value: dep.value,
                                label: dep.label,
                                companyId: dep.companyId,
                                company: dep.company,
                            }));
                        return {
                            name: company.companyName,
                            departments: companyDepartments,
                        };
                    });

                    // set state
                    setCompaniesData(transformedData);
                }
            }
        };

        fetchData();
    }, []);




    return (
        <Box sx={{ border: 'solid 1px', borderRadius: '6px', borderColor: 'rgba(0, 0, 0, 0.1)' }}>
            <Typography sx={{ textAlign: 'center', marginTop: '4px', marginBottom: '4px', padding: '8px', fontWeight: 500 }}>
                Công ty - Phòng ban
            </Typography>
            <List component="nav">
                {companiesData.map((company, index) => (
                    <React.Fragment key={company.name}>
                        <ListItemButton
                            selected={company.name === selectedCompany}
                            onClick={() => handleCompanyClick(company.name)}
                            sx={{
                                borderTop: index === 0 ? '1px solid' : 'none',
                                borderBottom: (index === companiesData.length - 1) ? 'none' : '1px solid',
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body1">
                                {company.name}
                            </Typography>
                            {expandedCompany === company.name ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </ListItemButton>
                        {company.name === expandedCompany && (
                            <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                {company.departments.map((department, departmentIndex) => (
                                    <ListItemButton
                                        key={departmentIndex}
                                        selected={department.value === selectedDepartment.value}
                                        onClick={() => handleDepartmentClick(department)}
                                        sx={{
                                            backgroundColor: department.value === selectedDepartment.value ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                                            borderBottom: (departmentIndex === company.departments.length - 1) ? 'none' : '1px solid',
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {department.value === selectedDepartment.value ? (
                                            <Typography variant="body1" sx={{ color: 'primary.main' }}>✓</Typography>
                                        ) : null}
                                        <Typography variant="body2" sx={{ pl: 4 }}>
                                            {department.label}
                                        </Typography>
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box >
    );
};

export default CompaniesList;
