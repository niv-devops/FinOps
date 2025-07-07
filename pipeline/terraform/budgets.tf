resource "aws_budgets_budget" "monthly" {
  name              = "monthly-cost-budget"
  budget_type       = "COST"
  time_unit         = "MONTHLY"
  limit_amount      = "100"
  limit_unit        = "USD"

  cost_filter {
    name = "Service"
    values = ["Amazon EC2"]
  }

  notification {
    comparison_operator = "GREATER_THAN"
    notification_type   = "ACTUAL"
    threshold           = 100
    threshold_type      = "PERCENTAGE"

    subscriber {
      address          = "you@example.com"
      subscription_type = "EMAIL"
    }
  }
}