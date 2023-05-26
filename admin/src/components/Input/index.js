import React, { useState } from "react";
import { findLast, filter, sortBy } from "lodash";
import {
  SingleSelect,
  SingleSelectOption,
  Box,
  Stack,
  Typography,
} from "@strapi/design-system";
import { useIntl } from "react-intl";
import { provinces } from "./provinces.json";
import { cities } from "./cities.json";

const Input = ({
  name,
  onChange: changeData,
  intlLabel,
  required,
  description,
  disabled,
  value: current = "{}",
}) => {
  const [value = current, setValue] = useState();
  const [
    selectedProvince = findLast(provinces, {
      slug: JSON.parse(current).province,
    })?.id,
    setSelectedProvince,
  ] = useState();

  const [error] = useState();
  const val = JSON.parse(value);
  const { formatMessage } = useIntl();
  return (
    <Stack>
      <Box>
        <div style={{ marginBottom: "12px" }}>
          <Typography variant="h1" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </div>

        {description && (
          <Typography variant="pi">{formatMessage(description)}</Typography>
        )}
      </Box>
      <SingleSelect
        label="Province"
        placeholder="Choose province..."
        hint="Choose province"
        onClear={() => {
          setValue({});
          changeData({
            target: { name, value: {} },
          });
        }}
        error={error}
        value={val.province}
        onChange={(v) => {
          const newValue = JSON.stringify({ province: v });
          setValue(newValue);
          setSelectedProvince(findLast(provinces, { slug: v }).id);
          changeData({
            target: { name, value: newValue },
          });
        }}
        disabled={disabled}
      >
        {sortBy(provinces, "slug").map((p) => (
          <SingleSelectOption key={`province-${p.id}`} value={p.slug}>
            {p.slug}
          </SingleSelectOption>
        ))}
      </SingleSelect>
      <br />
      <SingleSelect
        label="city"
        placeholder="Choose city..."
        hint="Choose city"
        onClear={() => {
          setValue({});
          changeData({
            target: { name, value: {} },
          });
        }}
        error={error}
        value={val.city}
        onChange={(v) => {
          const newValue = JSON.stringify({ province: val.province, city: v });
          setValue(newValue);
          changeData({
            target: { name, value: newValue },
          });
        }}
        disabled={disabled}
      >
        {sortBy(filter(cities, { province_id: selectedProvince }), "slug").map(
          (c) => (
            <SingleSelectOption key={`city-${c.id}`} value={c.slug}>
              {c.slug}
            </SingleSelectOption>
          )
        )}
      </SingleSelect>
    </Stack>
  );
};

export default Input;
