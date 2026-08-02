
const express = require('express')
const { metrics, usageMetrics, usageDetails, providerDistribution, topModelsUsage } = require('../controllers/metricsController')

const router = express.Router()

router.get("/metrics", metrics)
router.get("/metrics/usage", usageMetrics)
router.get("/metrics/usage-details", usageDetails);
router.get("/metrics/providers", providerDistribution);
router.get("/metrics/models", topModelsUsage);

module.exports = router