package com.realworldrobotics.hiegen.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.UuidGenerator;

/**
 * Created by Tim on 21.08.2015.
 */

@Entity
@UuidGenerator(name="ID_GEN")
@Table(name = "field_value")
public class FieldE {

    @Id
    @GeneratedValue(generator="ID_GEN")
    private String id;

    @ManyToOne
    @JoinColumn(name = "reference_id")
    private PatientE patient;

    @Column(name = "concept_name")
    private String conceptName;

    @Column(name = "group_concept_name")
    private String groupConceptName;

    @Column(name = "value")
    private String value;

    @Column(name = "row_num")
    private Integer rowNum;

    public FieldE() {
    }

    public String getConceptName() {
        return conceptName;
    }

    public void setConceptName(String conceptName) {
        this.conceptName = conceptName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRowNum() {
        return rowNum;
    }

    public void setRowNum(Integer rowNum) {
        this.rowNum = rowNum;
    }

    public PatientE getPatient() {
        return patient;
    }

    public void setPatient(PatientE patient) {
        this.patient = patient;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getGroupConceptName() {
        return groupConceptName;
    }

    public void setGroupConceptName(String groupConceptName) {
        this.groupConceptName = groupConceptName;
    }
}
