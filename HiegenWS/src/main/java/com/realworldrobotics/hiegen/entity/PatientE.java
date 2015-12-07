package com.realworldrobotics.hiegen.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.PrivateOwned;
import org.eclipse.persistence.annotations.UuidGenerator;

/**
 * Created by Tim on 21.08.2015.
 */

@Entity
@UuidGenerator(name="ID_GEN")
@Table(name = "patient")
public class PatientE {

    @Id
    @GeneratedValue(generator="ID_GEN")
    private String id;

    @OneToMany(mappedBy = "patient", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @PrivateOwned
    private List<FieldE> field;


    public PatientE() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<FieldE> getField() {
        return field;
    }

    public void setField(List<FieldE> field) {
        this.field = field;
    }
}
