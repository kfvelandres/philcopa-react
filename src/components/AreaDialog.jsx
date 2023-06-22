import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { SelectInput } from 'src/components/inputs'

import useAxios from 'src/hooks/useAxios'
import { GET_BARANGAY_API_URL, GET_CITY_API_URL, GET_PROVINCE_API_URL, GET_REGION_API_URL } from 'src/config/apiRoutes'

// const allCities = { value: '0', text: 'All Cities' }
// const allBarangays = { value: '0', text: 'All Barangays' }

const AreaDialog = ({ data, open, onClose, onUpdate }) => {
  const { get } = useAxios()

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const watchRegion = watch('regionId')
  const watchProvince = watch('provinceId')
  const watchCity = watch('cityId')

  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: () => get(GET_REGION_API_URL),
    refetchOnWindowFocus: false,
  })

  const provinceQuery = useQuery({
    queryKey: ['province', watchRegion],
    queryFn: () => get(GET_PROVINCE_API_URL.replace('{region}', regionQuery.data?.message.find((p) => p.id === watchRegion)?.region)),
    refetchOnWindowFocus: false,
    enabled: !!regionQuery.data && !!watchRegion,
  })

  const cityQuery = useQuery({
    queryKey: ['city', watchProvince],
    queryFn: () => get(GET_CITY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province)),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!watchProvince,
  })

  const barangayQuery = useQuery({
    queryKey: ['barangay', watchCity],
    queryFn: () =>
      get(
        GET_BARANGAY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province).replace(
          '{city}',
          cityQuery.data?.message.find((c) => c.id === watchCity).city,
        ),
      ),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!cityQuery.data && !!watchProvince && !!watchCity,
  })

  useEffect(() => {
    if (open) {
      if (data) {
        setValue('regionId', data.region.id)
        setValue('provinceId', data.province.id)
        setValue('cityId', data.city.id)
        setValue('barangayId', data.barangay.id)
      } else {
        reset()
      }
    }
  }, [open, reset])

  const onSubmit = (data) => {
    const area = {
      region: {
        id: data.regionId,
        text: regionQuery.data.message.find((p) => p.id === data.regionId).region,
      },
      province: {
        id: data.provinceId,
        text: provinceQuery.data.message.find((p) => p.id === data.provinceId).province,
      },
      city: {
        id: data.cityId,
        text: !data.cityId ? 'All Cities' : cityQuery.data.message.find((p) => p.id === data.cityId).city,
      },
      barangay: {
        id: data.barangayId,
        text: !data.barangayId ? 'All Barangays' : barangayQuery.data.message.find((p) => p.id === data.barangayId).baranggay,
      },
    }

    onUpdate(area)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{data ? 'Edit' : 'Add'} Area</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SelectInput
                control={control}
                items={regionQuery.data?.message.map((p) => ({ value: p.id, text: p.region })) || []}
                name="regionId"
                label="Region"
                placeholder="Select Region"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SelectInput
                control={control}
                items={provinceQuery.data?.message.map((p) => ({ value: p.id, text: p.province })) || []}
                name="provinceId"
                label="Province"
                placeholder="Select Province"
                size="small"
                required
                disabled={!watchRegion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SelectInput
                control={control}
                items={cityQuery.data?.message.map((p) => ({ value: p.id, text: p.city })) || []}
                name="cityId"
                label="City"
                placeholder="Select City"
                size="small"
                disabled={!watchProvince}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SelectInput
                control={control}
                items={barangayQuery.data?.message.map((p) => ({ value: p.id, text: p.baranggay })) || []}
                name="barangayId"
                label="Barangay"
                placeholder="Select Barangay"
                size="small"
                disabled={!watchCity}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {data ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

AreaDialog.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
}

export default AreaDialog
