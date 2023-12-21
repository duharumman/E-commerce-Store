import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { nanoid } from 'nanoid';

import { ApiError, client as square } from './square.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(express.json())

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/payment", async (req, res) => {
  const idempotencyKey = nanoid();
  const payment = {
    idempotencyKey,
    locationId: req.body.locationId,
    sourceId: req.body.sourceId,
    amountMoney: {
      amount: req.body.total * 100,
      currency: 'USD',
    },
  };

  try {
    const { result, statusCode } = await square.paymentsApi.createPayment(
      payment
    );

    res.status(statusCode).send({
      success: true,
      payment: {
        id: result.payment.id,
        status: result.payment.status,
        receiptUrl: result.payment.receiptUrl,
        orderId: result.payment.orderId,
      },
    });
  } catch (ex) {
    if (ex instanceof ApiError) {
      console.error(ex.errors);
    } else {
      console.error(`Error creating payment: ${ex}`);
      throw ex;
    }

    res.status(500).send({
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log(`ecommerce backend listening on port ${3000}`);
});
