package com.erp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "profit_records", indexes = {
        @Index(name = "idx_profit_period", columnList = "period_year, period_month")
}, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"company_id", "period_year", "period_month"})
})
public class ProfitRecord extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "period_year", nullable = false)
    private Integer periodYear;

    @Column(name = "period_month", nullable = false)
    private Integer periodMonth;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal revenue = BigDecimal.ZERO;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal expenses = BigDecimal.ZERO;

    @Column(name = "net_profit", precision = 15, scale = 2, nullable = false)
    private BigDecimal netProfit = BigDecimal.ZERO;

    @Column(name = "profit_margin", precision = 5, scale = 2)
    private BigDecimal profitMargin;
}
