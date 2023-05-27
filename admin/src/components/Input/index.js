import React, { useState } from "react";
import { findLast, filter, sortBy, isNull } from "lodash";
import {
  SingleSelect,
  SingleSelectOption,
  Box,
  Stack,
  Typography,
  Card,
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
  if (isNull(current) || current === "null") {
    current = "{}";
  }
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
      <div style={{ marginBottom: "5px" }}>
        <Typography variant="h1" fontWeight="bold">
          {formatMessage(intlLabel)}
        </Typography>
        {required && (
          <Typography variant="pi" fontWeight="bold" textColor="danger600">
            *
          </Typography>
        )}
      </div>
      <Card
        style={{ width: "100%" }}
        padding={4}
        background="primary"
        shadow="filterShadow"
      >
        <SingleSelect
          label="Province"
          placeholder="Choose province..."
          onClear={() => {
            setValue("{}");
            changeData({
              target: { name, value: "{}" },
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
          onClear={() => {
            setValue("{}");
            changeData({
              target: { name, value: "{}" },
            });
          }}
          error={error}
          value={val.city}
          onChange={(v) => {
            const newValue = JSON.stringify({
              province: val.province,
              city: v,
            });
            setValue(newValue);
            changeData({
              target: { name, value: newValue },
            });
          }}
          disabled={disabled}
        >
          {sortBy(
            filter(cities, { province_id: selectedProvince }),
            "slug"
          ).map((c) => (
            <SingleSelectOption key={`city-${c.id}`} value={c.slug}>
              {c.slug}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </Card>
    </Stack>
  );
};

export default Input;
