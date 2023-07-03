import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLending } from 'apiSdk/lendings';
import { Error } from 'components/error';
import { lendingValidationSchema } from 'validationSchema/lendings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { EquipmentInterface } from 'interfaces/equipment';
import { ClientInterface } from 'interfaces/client';
import { getEquipment } from 'apiSdk/equipment';
import { getClients } from 'apiSdk/clients';
import { LendingInterface } from 'interfaces/lending';

function LendingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LendingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLending(values);
      resetForm();
      router.push('/lendings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LendingInterface>({
    initialValues: {
      lending_date: new Date(new Date().toDateString()),
      return_date: new Date(new Date().toDateString()),
      equipment_id: (router.query.equipment_id as string) ?? null,
      client_id: (router.query.client_id as string) ?? null,
    },
    validationSchema: lendingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Lending
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="lending_date" mb="4">
            <FormLabel>Lending Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.lending_date ? new Date(formik.values?.lending_date) : null}
                onChange={(value: Date) => formik.setFieldValue('lending_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="return_date" mb="4">
            <FormLabel>Return Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.return_date ? new Date(formik.values?.return_date) : null}
                onChange={(value: Date) => formik.setFieldValue('return_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<EquipmentInterface>
            formik={formik}
            name={'equipment_id'}
            label={'Select Equipment'}
            placeholder={'Select Equipment'}
            fetcher={getEquipment}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'lending',
    operation: AccessOperationEnum.CREATE,
  }),
)(LendingCreatePage);
